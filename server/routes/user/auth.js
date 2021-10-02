"use strict"

const express = require('express');
const passport = require('../../passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./check_login');
const User = require('../../models/users');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) =>{
    const {name, militaryNumber, unit, password, position} = req.body;
    console.log(req.body)
    try {
        const exUser = await User.findOne({ where: {militaryNumber} });
        if (exUser){
            return res.redirect('join?error=exist');
        }
        const executive = 0;
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            militaryNumber,
            name,
            password: hash,
            unit,
            executive,
            position,
        });
        // return res.redirect('/');
        return res.json({success : true,data :null});// 클라 연동시
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
            cachedUser = user;
            // return res.redirect('/');
            console.log('로그인 성공');
            return res.json({success : true,data: null} );// 클라연동시
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req,res) => {
    cachedUser.user = null;
    delete cachedUser.user;
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;