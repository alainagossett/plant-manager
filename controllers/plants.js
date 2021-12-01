//Require Dependencies
const express = require('express');
const plantsRouter = express.Router();

// const Plant = require('../modles/plant');

//Define Routes
plantsRouter.get('/', (req, res) => {
    res.send("Hello World");
})




module.exports = plantsRouter;