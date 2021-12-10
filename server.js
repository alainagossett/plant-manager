//Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const plantsController = require('./controllers/plants');

//Initialize the App
const app = express();

//Configure Settings
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//Connect and Configure MongoDB
mongoose.connect(process.env.DATABASE_URI)

//Set up listeners for MongoDB events
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.log(err.message));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

//Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(expressFileUpload({ createParentPath: true }));

//Mount Routes
app.use('/', plantsController);

//Tell the App to Listen
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))