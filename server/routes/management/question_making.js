"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { Question } = require('../../models');
const { isNotExecutive } = require('../user/check_is_executive');

const router = express.Router();

const mentalStrategy = 0;
const firstAid = 1
const guard = 2;
const cbr = 3;


router.route('/exam/mental')
    .get(isLoggedIn, checkIsExecutive, async (req, res, next) => {
        try {
            const examQuestion = await Question.findAndCountAll({ where: { category: mentalStrategy } });
            const data = {
                examQuestion: examQuestion,
            };
            return res.json({ success: true, data });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .get(isLoggedIn, isNotExecutive, async (req, res, next) => {
        try {
            const examQuestion = await Question.findAndCountAll(); // 여기부터 수정해야함
            const data = {
                examQuestion: examQuestion,
            };
            return res.json({ success: true, data });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }) // 병사는 문제 수 정해서 그만큼만 
    .post(isLoggedIn, isExecutive, async (req, res, next) => {
        try {
            const { question, answer } = req.body;
            const category = mentalStrategy;
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
router.route('/exam/mental/executive/:questionId')
    .put(isLoggedIn, isExecutive, async (req, res, next) => {
        try {
            const { question, answer, category } = req.body;
            const currentQuestionId = req.params.questionId;
            await Question.update({
                question: question,
                answer: answer,
                category: category,
            }, {
                where: { id: currentQuestionId },
            });
            return res.json({ success: true, data: null });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(isLoggedIn, isExecutive, async (req, res, next) => {
        try {
            const currentQuestionId = req.params.questionId;
            const exQuestion = await Question.findOne({ where: { id: currentQuestionId } });
            if (exQuestion) {
                return res.json({ success: true, data: null });
            }
            else {
                const data = {
                    message: 'no exist',
                };
                return res.json({ success: false, data });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

function checkIsExecutive(req, res, next) {
    try {
        if (req.user.executive) {
            next();
        }
        else {
            next('route');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = router;