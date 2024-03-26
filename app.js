const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Stagiaire = require("./models/stagiaireModel");

const app = express();
app.use(express.json());
app.use(cors()); 

const url =
  "mongodb+srv://devowfs205:test205@project-express-mongo.xnj0bzm.mongodb.net/stagiaires?retryWrites=true&w=majority&appName=project-express-mongo";

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB server seccussfully");
});

app.get("/", async (req, res) => {
  const data = await Stagiaire.find();
  res.json(data);
});

app.post("/add", async (req, res) => {
  try {
    const newStagiaire = new Stagiaire(req.body);

    const savedStagiaire = await newStagiaire.save(); // Save the new stagiaire to the database

    res.status(201).json(savedStagiaire); // Respond with the saved stagiaire object
  } catch (error) {
    res.status(500).json({ error: "Could not add stagiaire" }); // Handle errors
  }
});

app.get("/:id", async (req, res) => {
  try {
    const stagiaire = await Stagiaire.findById(req.params.id);
    if (!stagiaire) {
      return res.status(404).json({ error: "Stagiaire not found" });
    }
    res.json(stagiaire);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch stagiaire" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const updatedStagiaire = await Stagiaire.findByIdAndUpdate(
      req.params.id, // ID of the stagiaire to update
      {$set:{...req.body}}, // Updated data
      {new: true} // Return the updated stagiaire object
    );
    res.json(updatedStagiaire);
  } catch (error) {
    res.status(500).json({ error: "Could not update stagiaire" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deletedStagiaire = await Stagiaire.findByIdAndDelete(req.params.id); // Find and delete stagiaire by ID

    if (!deletedStagiaire) {
      return res.status(404).json({ error: "Stagiaire not found" });
    }

    res.json({ message: "Stagiaire deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete stagiaire" });
  }
});


app.listen(4000, () => console.log("listening on port 4000"));
