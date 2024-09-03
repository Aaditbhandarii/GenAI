import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const userId = 2;

app.get("/", async (req, res) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:5000/detect-ingredients",
            { image_path: "C:/Users/aadit/OneDrive - Shri Vile Parle Kelavani Mandal/Desktop/GenAI/server/image.png" ,
            "user_id": userId},
            { headers: { "Content-Type": "application/json" } }
        );
        
        console.log(response.data);
        console.log(response.data.ingredients);
        console.log(response.status);
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500).send("Error occurred");
    }
});

app.use(express.static("public"));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'second.html'));
// });

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username, password);
//     res.send('Login successful!');
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
