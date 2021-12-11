//Require Dependencies
const express = require('express');
const plantsRouter = express.Router();

const Plant = require('../models/plant');

const cloudinary = require('cloudinary').v2;

//Define Routes
plantsRouter.get('/', (req, res) => {
    res.send("Hello World");
});

//Landing Page
plantsRouter.get('/plants/root', (req, res) => {
    res.render('land.ejs', {
        tabTitle: 'Plant Manager Home',
        currentLink: true,
    });
});

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
});

//Index Route
plantsRouter.get('/plants/manager', (req, res) => {
    Plant.find({}, (error, plants) => {
        res.render('index.ejs', {
            plants,
            tabTitle: 'Plant Manager',
        });
    });
});

//New Route
plantsRouter.get('/plants/propagate', (req, res) => {
    res.render('new.ejs', {
        tabTitle: 'New Plant Page',
    });
});

//Delete Route
plantsRouter.delete('/plants/:id', (req, res) => {
    Plant.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/plants/manager');
    });
});

//Update Route
plantsRouter.put('/plants/:id', (req, res) => {
    Plant.findByIdAndUpdate (
        req.params.id, req.body,
        { new: true },
        (err, updatedPlant) => {
            res.redirect(`/plants/${req.params.id}`)
        });
});

//Create Route
plantsRouter.post('/plants', (req, res) => {
    const photo = req.files.uplImage;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
        req.body.uplImage = result.secure_url;
        Plant.create(req.body, (err, createdPlant) => {
            res.redirect('/plants/manager')
        });
    }).catch(error => console.log(error));
});

//Edit Route
plantsRouter.get('/plants/:id/edit', (req, res) => {
    Plant.findById(req.params.id, (err, plant) => {
        res.render('edit.ejs', {
            plant,
            tabTitle: 'Edit Plant Page',
        });
    });
});

//Show Route
plantsRouter.get('/plants/:id', (req, res) => {
    Plant.findById(req.params.id, (error, plant) => {
        res.render('show.ejs', {
            plant,
            tabTitle: 'Show Plant Page',
        });
    });
});

module.exports = plantsRouter;