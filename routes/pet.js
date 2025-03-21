import express from "express";
import { getAllPets, getFilteredPets, getPet, createPetListing, sendMails } from "../controllers/pet.js";
import multer from "multer";
import path from 'path';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder where images will be stored
        cb(null, 'uploads/'); // You can change 'uploads/' to another folder if needed
    },
    filename: (req, file, cb) => {
        // Set the filename to be unique
        cb(null, Date.now() + path.extname(file.originalname)); // Adding timestamp to the filename
    }
});

const upload = multer({ storage: storage });

const router = express.Router();


router.get("/", getAllPets);
router.get("/filtered", getFilteredPets);
router.get("/:id", getPet);

// Corrected route to handle image upload
router.post("/new", upload.single('image'), createPetListing);
router.post("/sendmail", sendMails);

export default router;
