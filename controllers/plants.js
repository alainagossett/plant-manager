//Require Dependencies
const express = require('express');
const plantsRouter = express.Router();

const Plant = require('../models/plant');

//Define Routes
plantsRouter.get('/', (req, res) => {
    res.send("Hello World");
})

//Landing Page
plantsRouter.get('/plants/root', (req, res) => {
    res.render('land.ejs');
})

//Seed Route
plantsRouter.get('/plants/seed', async (req, res) => {
    const data = [{
            name: "Monstera Deliciosa",
            img: "https://i.imgur.com/8iZWJdu.jpeg",
            description: "Famous for their natural leaf-holes, this popular plant is fondly nicknamed the Swiss Cheese Plant.",
            sunlight: "Bright to medium indirect light",
            water: "Every 1-2 weeks, depending on light level",
            problems: "Fungus flies, root rot, underwatering"
        },
        {
            name: "Golden Pothos",
            img: "https://i.imgur.com/z5IyOil.jpeg",
            description: "Known for being one of the easiest houseplants to care for, this trailing plant comes in many delightful varieties.",
            sunlight: "Bright to low light",
            water: "Every 1-2 weeks, depending on light level",
            problems: "Underwatering, overwatering"
        },
        {
            name: "Zamioculcas Zamiifolia",
            img: "https://i.imgur.com/o6uMVMf.jpeg",
            description: "A highly dependable houseplant, ZZ Plants are great starter plants due to their tolerance for neglect.",
            sunlight: "Medium to low indirect light",
            water: "Every 2-3 weeks, depending on light level",
            problems: "Root rot, overwatering"
        },
    ];
    await Plant.create(data)
    res.redirect('/plants/root');
})

//Index Route
plantsRouter.get('/plants/manager', (req, res) => {
    Plant.find({}, (error, plants) => {
        res.render('index.ejs', {
            plants,
        })
    })
})

//New Route
plantsRouter.get('/plants/propagate', (req, res) => {
    res.render('new.ejs')
})

//Delete Route

//Update Route

//Create Route

//Show Route
plantsRouter.get('/plants/:id', (req, res) => {
    Plant.findById(req.params.id, (error, plant) => {
        res.render('show.ejs', {
            plant,
        })
    })
})

module.exports = plantsRouter;