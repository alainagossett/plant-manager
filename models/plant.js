//Require Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const plantSchema = new Schema({
    
})

//Compile mongoose Schema into a model
const Plant = mongoose.model("Plant", plantSchema)

module.exports = Plant;