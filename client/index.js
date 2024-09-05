import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { config } from "dotenv";


const fileName = fileURLToPath(import.meta.url);
const dotenvDirName = path.dirname(fileName);
const dotenvPath = path.join(dotenvDirName, "../.env");
config({ path: dotenvPath });

const app = express();
const port = 3000;
const saltRounds = 10;
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

passport.serializeUser((user, done) => {
    done(null, user.user_id); 
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
      if (result.rows.length > 0) {
        done(null, result.rows[0]);
      } else {
        done(new Error("User not found"));
      }
    } catch (err) {
      done(err);
    }
});
  

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password_hash;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) return done(err);
            if (valid) return done(null, user);
            else return done(null, false, { message: "Incorrect password" });
          });
        } else {
          return done(null, false, { message: "User not found" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.get("/loginpage", (req, res) => {
    res.render("loginpage.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.redirect("/loginpage");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).send("Internal server error");
        } else {
          const result = await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hash]
          );

          req.login(result.rows[0], (err) => {
            if (err) {
              console.error("Error logging in after registration:", err);
              return res.status(500).send("Login after registration failed");
            }
            console.log("User ID after registration and login:", result.rows[0].user_id);
            res.redirect("/homepage");
          });
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
app.post(
  "/loginpage",
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/loginpage",
  })
);

app.post('/predict', async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.user_id;
        const claim = req.body.claim;
        console.log("User ID:", userId);
        try {
            let ingredients = null;
            let verdict = "No verdict";
            let why = [];
            let detailed_analysis = "No analysis available";

            try {
                const response = await axios.post(
                    "http://127.0.0.1:5000/detect-ingredients",
                    { image_path: "C:/Users/aadit/OneDrive - Shri Vile Parle Kelavani Mandal/Desktop/GenAI/server/image.png", user_id: userId },
                    { headers: { "Content-Type": "application/json" } }
                );
                ingredients = response.data.ingredients || "No ingredients detected";

                const data = await analyzeClaim(claim, ingredients);

                console.log("Data:", data);

                if (data) {
                    verdict = data.verdict;
                    why = data.why;
                    detailed_analysis = data.detailed_analysis;
                }
            } catch (error) {
                console.error("Failed to make request:", error.message);
                ingredients = "Error occurred during prediction";
            }

            const searches = await previousSearches(userId);
            res.render('homepage', { searches, ingredients, verdict, why, detailed_analysis });
        } catch (error) {
            console.error("Error fetching previous searches:", error.message);
            res.status(500).send("Error occurred");
        }
    } else {
        res.redirect("/loginpage");
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  

app.get('/homepage', async (req, res) => {
    if (!req.user.user_id) {
      return res.redirect('/loginpage');
    }
    try {
      const searches = await previousSearches(req.user.user_id);
      res.render('homepage', { searches });
    } catch (err) {
      console.error("Error fetching previous searches:", err);
      res.status(500).send("Error occurred");
    }
});
  

const previousSearches = async (user_id) => {
    try {
        const query = `
            SELECT p.product_name, p.product_brand, p.ingredients
            FROM user_searches s
            JOIN products p ON s.product_id = p.product_id
            WHERE s.user_id = $1
        `;
        const result = await db.query(query, [user_id]);
        if (result.rows.length === 0) {
            return [];
        }
        return result.rows;
    } catch (err) {
        console.error("Error fetching user searches:", err);
        throw err;
    }
};

const analyzeClaim = async (claim, ingredients) => {
    try {
        const response = await axios.get('https://cwbackend-a3332a655e1f.herokuapp.com/claims/analyze', {
            params: {
                claim: claim,
                ingredients: ingredients
            }
        });
        const data = JSON.parse(response.data);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error making request:', error.message);
        throw error;
    }
};
