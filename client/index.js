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
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import flash from 'connect-flash';
const upload = multer({ dest: 'uploads/' });

const fileName = fileURLToPath(import.meta.url);
const dotenvDirName = path.dirname(fileName);
const dotenvPath = path.join(dotenvDirName, "./.env");
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

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect().catch(err => console.error('Database connection error', err));

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
  res.render("index");
})

// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (checkResult.rows.length > 0) {
//       res.redirect("/loginpage");
//     } else {
//       bcrypt.hash(password, saltRounds, async (err, hash) => {
//         if (err) {
//           console.error("Error hashing password:", err);
//           res.status(500).send("Internal server error");
//         } else {
//           const result = await db.query(
//             "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
//             [username, email, hash]
//           );

//           req.login(result.rows[0], (err) => {
//             if (err) {
//               console.error("Error logging in after registration:", err);
//               return res.status(500).send("Login after registration failed");
//             }
//             console.log("User ID after registration and login:", result.rows[0].user_id);
//             res.redirect("/homepage");
//           });
//         }
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });

// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (checkResult.rows.length > 0) {
//       // Render index.ejs with a flag to open the login modal and show an error
//       res.render("index.ejs", {
//         loginModalOpen: true,
//         message: "Email already exists. Please log in.",
//       });
//     } else {
//       bcrypt.hash(password, saltRounds, async (err, hash) => {
//         if (err) {
//           console.error("Error hashing password:", err);
//           res.status(500).send("Internal server error");
//         } else {
//           const result = await db.query(
//             "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
//             [username, email, hash]
//           );

//           req.login(result.rows[0], (err) => {
//             if (err) {
//               console.error("Error logging in after registration:", err);
//               return res.status(500).send("Login after registration failed");
//             }
//             console.log("User ID after registration and login:", result.rows[0].user_id);
//             res.redirect("/homepage");
//           });
//         }
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      // User already exists, open the login modal and display error message
      return res.render("index.ejs", {
        loginModalOpen: true, // This opens the login modal
        message: "Email already exists. Please log in.",
      });
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

app.get('/homepage', async (req, res) => {
    if (!req.user.user_id) {
      return res.redirect('/');
    }
    try {
      const searches = await previousSearches(req.user.user_id);
      res.render('homepage', { searches });
    } catch (err) {
      console.error("Error fetching previous searches:", err);
      res.status(500).send("Error occurred");
    }
});
  
app.get('/product/:id', async (req, res) => {
  if (req.isAuthenticated()) {
      const productId = req.params.id;
      try {
          const query = 'SELECT * FROM products WHERE product_id = $1';
          const values = [productId];
          
          const result = await db.query(query, values);

          if (result.rows.length === 0) {
              res.status(404).send('Product not found.');
              return;
          }
          const product = result.rows[0];
          res.render('productDetails', { product });
      } catch (error) {
          console.error("Error fetching product details:", error.message);
          res.status(500).send("Error occurred while fetching product details.");
      }
  } else {
      res.redirect("/login");
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// app.post("/loginpage", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       // Pass loginError and message to the template when authentication fails
//       return res.render("index.ejs", {
//         loginError: true,
//         message: "Invalid email or password",
//       });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/homepage");
//     });
//   })(req, res, next);
// });

// app.post(
//   "/loginpage",
//   passport.authenticate("local", {
//     successRedirect: "/homepage",
//     failureRedirect: "/",
//     failureFlash: true, // To use flash messages if you have configured flash middleware
//   }),
//   (req, res) => {
//     if (req.isAuthenticated()) {
//       res.redirect("/homepage");
//     } else {
//       // Handle login error by rendering the page with the login modal open
//       res.render("index.ejs", {
//         loginModalOpen: true,
//         message: "Invalid email or password. Please try again.",
//       });
//     }
//   }
// );

app.post("/loginpage", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Handle error
    }
    if (!user) {
      // Login failed, keep the modal open and show the error message
      return res.render("index.ejs", {
        loginModalOpen: true,
        message: info ? info.message : "Invalid email or password.",
      });
    }
    // If login is successful
    req.login(user, (err) => {
      if (err) {
        return next(err); // Handle error
      }
      return res.redirect("/homepage");
    });
  })(req, res, next);
});

app.post('/predict', upload.single('image'), async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.user_id;
    const claim = req.body.claim;
    const file = req.file;
    const ingredientsInput = req.body.ingredients;
    console.log("User ID:", userId);
    try {
      if (!file && !ingredientsInput) {
        console.error("No file or ingredients provided");
        return res.status(400).send("Please provide either an image or ingredients");
      }
      let ingredients = ingredientsInput || null;
      let product_name = "No product name detected";
      let product_brand = "No product brand detected";
      let verdict = "No verdict";
      let why = [];
      let detailed_analysis = "No analysis available";
      if (!ingredientsInput && file) {
        const uniqueFilename = uuidv4() + '.jpg';
        const jpegImagePath = path.join(dotenvDirName, 'uploads', uniqueFilename);
        await saveImageAsJPEG(file.path, jpegImagePath);
        try {
          const form = new FormData();
          form.append('image', fs.createReadStream(jpegImagePath));
          form.append('user_id', userId);
          form.append('filename', uniqueFilename);
          const response = await axios.post(
            "http://server:5000/detect-ingredients",
            form,
            {
              headers: {
                ...form.getHeaders(),
              },
            }
          );
          ingredients = response.data.ingredients || "No ingredients detected";
          product_name = response.data.product_name || "No product name detected";
          product_brand = response.data.product_brand || "No product brand detected";
        } catch (error) {
          console.error("Failed to make request:", error.message);
          ingredients = "Error occurred during prediction";
        }
      }
      console.log("Ingredients:", ingredients);
      const data = await analyzeClaim(claim, ingredients);
      console.log("Data:", data);
      if (data) {
        verdict = data.verdict;
        why = data.why;
        detailed_analysis = data.detailed_analysis;
      }
      res.render('prediction', { 
        product_name, 
        product_brand, 
        ingredients, 
        verdict, 
        why, 
        detailed_analysis 
      });
    } catch (error) {
      console.error("Error in /detect-ingredients:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});


app.post('/search', async (req, res) => {
  if (req.isAuthenticated()) {
      const productName = req.body.product_name;
      const userId = req.user.user_id;

      try {
        const query = `
        SELECT * FROM products
        WHERE LOWER(product_name) LIKE LOWER($1)
        OR LOWER(product_brand) LIKE LOWER($1);
        `;
        const values = [`%${searchTerm}%`];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
              res.render('searchResults', { products: [], message: 'No products found.', userId });
              return;
        }
        const products = result.rows;
        res.render('searchResults', { products, message: null, userId });
      } catch (error) {
          console.error("Error searching for products:", error.message);
          res.status(500).send("Error occurred during the search.");
      }
  } else {
      res.redirect("/index");
  }
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const previousSearches = async (user_id) => {
    try {
        const query = `
            SELECT p.product_name, p.product_brand, p.ingredients
            FROM user_searches s
            JOIN products p ON s.product_id = p.product_id
            WHERE s.user_id = $1
            ORDER BY s.search_timestamp DESC
            LIMIT 3
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
async function saveImageAsJPEG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .jpeg()
      .toFile(outputPath);
    console.log(`Image saved as JPEG at: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error saving image as JPEG:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})