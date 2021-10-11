"use strict"

const express = require('express');
const passport = require('../../passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./check_login');
const User = require('../../models/users');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { name, militaryNumber, unit, password, position, isExecutive } = req.body;
    console.log(req.body)
    try {
        const exUser = await User.findOne({ where: { militaryNumber } });
        if (exUser) {
            return res.redirect('join?error=exist');
        }
        let executive = 0;
        if (isExecutive) {
            executive = 1;
            if (position.includes("중대장")) {
                executive = 2;
            } else if (position.includes("대대장") || position.includes("주임원사")) {
                executive = 3;
            }
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            militaryNumber,
            name,
            password: hash,
            unit,
            executive,
            position,
            joinArmyDay: null,
        });
        console.log('회원가입됨');
        // return res.redirect('/');
        return res.json({ success: true, data: null });// 클라 연동시
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local-login', (authError, user, info) => {

        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/?loginError=$i{info.message}');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const data = {
                isExecutive: req.user.executive,
            };
            return res.json({ success: true, data });

        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({ success: true, data: null });
});

router.get('/profile', isLoggedIn, (req, res) => {
    const data = {
        name: req.user.name,
        militaryNumber: req.user.militaryNumber,
        position: req.user.position,
    };
    res.json({success: true, data});
})

module.exports = router;