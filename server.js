import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
//Import route modules
import petRoutes from "./routes/pet.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Route modules
app.use("/lostpets", petRoutes);

//Connection to Database
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to database")
    })
    .catch(err => {
        console.log("Database connection failed. Exiting now.");
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});