// import mongoose from "mongoose";
const mongoose = require('mongoose');

const StagiaireSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Stagiaire',StagiaireSchema,'stagiaire');
//--------------------------------varname------------------collectionName