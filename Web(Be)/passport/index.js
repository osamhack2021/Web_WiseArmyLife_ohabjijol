"use strict"

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users')


passport.use('local-login', new LocalStrategy({
    usernameField: 'militaryNumber',
    passwordField: 'password',
    session: true, // 세션을 사용할지 여부
    passReqToCallback: false, // callback함수에 req를 인자로 넘겨줌
}, async (militaryNumber, password, done) => {
    try {
        const exUser = await User.findOne({ where: { militaryNumber } });
        if (exUser) {
            const check = await bcrypt.compare(password, exUser.password);
            if (check) {
                done(null, exUser);
            } else {
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
    } catch (error) {
        console.error(error);
        done(error);
    }
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
});

module.exports = passport;