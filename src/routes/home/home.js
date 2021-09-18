"use strict";

const express = require('express');

const homeCTRL = require('./home_ctrl');
const checkLogin = require('../user/check_login');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/* GET home page. */
router.get('/', homeCTRL.output.home);
router.get('/login', homeCTRL.output.login);
router.get('/profile', homeCTRL.output.profile);
router.get('/join', homeCTRL.output.join);
// router.post('/login', homeCTRL.process.login);
module.exports = router;
