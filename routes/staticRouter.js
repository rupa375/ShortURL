// routes/staticRouter.js
const express = require('express');
const router = express.Router();
const URL = require('../models/url'); // your model

// Home page
router.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
});

// Signup page
router.get('/signup', (req, res) => {
    return res.render('signup');
});

module.exports = router;
