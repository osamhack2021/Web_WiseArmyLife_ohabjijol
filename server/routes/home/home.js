"use strict";

const express = require('express');

const homeCTRL = require('./home_ctrl');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');

const router = express.Router();

router.use((req, res, next) => {

    if(req.user) {
        res.locals.user = req.user; //클라 연동 시 필요 없음
    }
    next();
    
});

/* GET home page. */
router.get('/', homeCTRL.output.home);
router.get('/login', isNotLoggedIn, homeCTRL.output.login);
router.get('/profile', isLoggedIn, homeCTRL.output.profile);
router.get('/join', isNotLoggedIn, homeCTRL.output.join);



module.exports = router;
