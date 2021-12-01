//Require Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const plantSchema = new Schema({
    name: { type: String, required: true },
    colors: String,
    sunlight: String,
    water: String,
    pests: String
}, { timestamps: true });

//Compile mongoose Schema into a model
const Plant = mongoose.model("Plant", plantSchema)

module.exports = Plant;