import petModel from "../models/petModel.js";
import nodemailer from 'nodemailer';


async function sendMail(datamail) {

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'duraiessakimuthu@gmail.com',
          pass:"sjvb isfq ndsu tqgi"
      }
  });

  var mailOptions = {
      from: 'duraiessakimuthu@gmail.com',
      to: datamail.to_email,
      subject: 'MISSING PETS DETAILS',
      text: `Reply to: ${datamail.reply_to}\nMessage: ${datamail.message}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });


}

export const sendMails = async (req, res) => {
  try {
    console.log(req.body);
    // const pets = await petModel.find({});
    sendMail(req.body);
    res.status(201).send({message:"Mail has been sent"});
  } catch (err) {
    res.status(404).send(err);
  }
};


//Get all missing pets
export const getAllPets = async (req, res) => {
  try {
    const pets = await petModel.find({});
    res.status(201).send(pets);
  } catch (err) {
    res.status(404).send(err);
  }
};

//Get all pets lost at specific city
//City is sent as a parameter of the query object of the request object
export const getFilteredPets = async (req, res) => {
  try {
    const { city } = req.query;
    const pets = await petModel.find({ city });
    res.status(201).send(pets);
  } catch (err) {
    res.status(404).send(err);
  }
};

//Create new lost pet listing
export const createPetListing = async (req, res) => {
  const newPetData = {
    petName: req.body.petName,
    date: req.body.date,
    breed: req.body.breed,
    age: req.body.age,
    email: req.body.email,
    description: req.body.description,
    city: req.body.city,
    image: req.file ? req.file.path : null, // If image is uploaded, save the path
  };
  const newPet = new petModel(newPetData);
  try {
    await newPet.save();
    res.status(201).send(newPet);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get specific pet
export const getPet = async (req, res) => {
    const { id } = req.params;
  try {
    const pet = await petModel.find({ _id: id });
    res.status(201).send(pet);
  } catch (err) {
    res.status(404).send(err);
  }
}
