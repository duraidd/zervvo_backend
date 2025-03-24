import mongoose from "mongoose";
import validator from "validator";

const petSchema = new mongoose.Schema({
    petName: { 
        type: String,
        required: [true, 'Pet name is required']
    },
    date: { 
        type: Date,
        required: [true, 'Date is required']
     },
     breed: { 
        type: String,
        required: [true, 'Breed is required']
     },
     age: { 
        type: Number,
        required: [true, 'Date is required']
     },
    city: { 
        type: String,
        required: [true, 'City is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        validate: [ validator.isEmail,{ message: "Valid email is required"}]
    },
    description: {
        type: String
    },
    image: { 
        type:String
    },
});

export default mongoose.model("Pet", petSchema);