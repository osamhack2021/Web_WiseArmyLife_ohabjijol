"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { Question } = require('../../models');
const { isNotExecutive } = require('../user/check_is_executive');

const router = express.Router();

router.post('/exam', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        await question.Create({
            question: question,
            answer: answer,
        });
        return res.json({ success: true, data: null });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/exam', isLoggedIn, isNotExecutive, async (req, res, next) => {
    try {
        const examQuestion = Question.findAndCountAll();
        
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;