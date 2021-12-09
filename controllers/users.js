const usersRouter = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10;

usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {err: ''});
});