"use strict";

const output = {
    home: (req,res) => {
        const twits = [];
        res.render('main', {
            title: 'NodeBird',
            twits,
        });
    },
    login: (req,res) => {
        res.render("home/login");
    },
    join: (req,res) => {
        res.render('join', { title: '회원가입 - NodeBird' });
    },
    profile: (req,res) => {
        res.render('profile', { title: '내 정보 - NodeBird' });
    },
    
}


module.exports = {
    output,
    process,
}