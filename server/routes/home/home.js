"use strict";

const express = require('express');

const homeCTRL = require('./home_ctrl');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const { Post, User } = require('../../models');

const router = express.Router();

router.use((req, res, next) => {
    if(req.user){
        res.locals.user = req.user;
    }
    next();
});

/* GET home page. */
router.get('/', homeCTRL.output.home);
router.get('/login', isNotLoggedIn, homeCTRL.output.login);
router.get('/profile', isLoggedIn, homeCTRL.output.profile);
router.get('/join', isNotLoggedIn, homeCTRL.output.join);

router.get('/community', isLoggedIn, async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'militaryNumber', 'name'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('community', {
            title: 'military Community',
            posts: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;
