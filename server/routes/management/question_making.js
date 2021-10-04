"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { Question } = require('../../models');
const { isNotExecutive } = require('../user/check_is_executive');

const router = express.Router();

const firstAid = 0;
const mental = 1;
const guard = 2;
const cbr = 3;

router.post('/exam', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const { question, answer, category } = req.body;
        await question.Create({
            question: question,
            answer: answer,
            category: category,
        });
        return res.json({ success: true, data: null });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/exam/firstAid', isLoggedIn, isNotExecutive, async (req, res, next) => {
    try {
        const examQuestion = Question.findAndCountAll({ where: { category: firstAid } });
        
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;