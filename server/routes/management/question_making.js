"use strict"

const express = require('express');
const sequelize = require('sequelize');

const { isLoggedIn } = require('../user/check_login');
const { isExecutive } = require('../user/check_is_executive');
const { Question } = require('../../models');

const router = express.Router();

const mentalStrategy = 0;
const firstAid = 1
const guard = 2;
const cbr = 3;
const examQuestionNumber = 20; // 병사에게 보여줄 문제 수

router.route('/') // 주소는 알아서 바꾸세요
    .get(isLoggedIn, checkIsNotExecutive, async (req, res, next) => {
        try {
            console.log('병사면 들어옴');
            const examCount = await Question.count({});
            if (examCount) {
                const examQuestion = await Question.findAll({ order: sequelize.literal('rand()'), limit: examQuestionNumber });
                const data = {
                    examQuestion: examQuestion,
                };
                return res.json({ success: true, data });
            } else {
                return res.json({ success: false, data: null });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }) // 병사는 문제 수 정해서 그만큼만 
    .get(isLoggedIn, isExecutive, async (req, res, next) => {
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
    }) // 간부일땐 모든 문제
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
router.route('/executive/:questionId')
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
    }); // 정신전력 문제 CRUD

function checkIsNotExecutive(req, res, next) {
    try {
        if (!req.user.executive) {
            next();
        }
        else {
            console.log('여기가 실행됨');
            next('route');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = router;