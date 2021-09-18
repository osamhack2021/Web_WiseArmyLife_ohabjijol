"use strict"

const express = require('express');
const passport = require('passport');
const bcrpt = require('bcrpt');
const { isLoggedIn, isNotLoggedIn } = require('./check_login');
const User = require('../../models/users');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) =>{
    const {nick, password, unit, isExecutive} = req.body;
    try {
        const exUser = User.findOne({ where: {email} }); 
        if (exUser){
            return res.redirect('join?error=exist');
        }
        const hash = await bcrpt.hash(password, 12);
        await User.create({
            nick,
            password,
            unit,
            isExecutive,
        });
        return redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, async(req, res, next) => {
    passport.authenticate('local', (authError, user ,info) => {
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if (!user){
            return redirect('/?loginError=$i{info.message}');
        }
        return req.login(user, (loginError) => {
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});