"use strict"

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users')

passport.use('local-login', new LocalStrategy({
    usernameField: 'militaryNumber',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
}, async (militaryNumber, password, done) => {
    try {
        const exUser = await User.findOne({ where: { militaryNumber }});
        if(exUser){
            let result = false;
            if(password == exUser.password)
                result = true;
            if(result){
                done(null, exUser);
            } else {
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            done(null, false, { message: '가입되지 않은 회원입니다.'});
        }
    } catch(error) {
        console.error(error);
        done(error);
    }
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
});


module.exports = passport;