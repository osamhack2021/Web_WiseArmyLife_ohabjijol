"use strict"

const express = require('express');
const passport = require('../../passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./check_login');
const User = require('../../models/users');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) =>{
    const {name, militaryNumber, unit, password, isExecutive} = req.body;
    try {
        const exUser = await User.findOne({ where: {militaryNumber} });
        if (exUser){
            return res.redirect('join?error=exist');
        }
        await User.create({
            militaryNumber,
            name,
            password,
            unit,
            isExecutive,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, async(req, res, next) => {
    passport.authenticate('local-login', (authError, user ,info) => {
        
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if (!user){
            return res.redirect('/?loginError=$i{info.message}');
        }
        return req.login(user, (loginError) => {
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
            // res.json({ sucess: true }); 클라 연동 시 넣을 것
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;