const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive,isExecutive} = require('../user/check_is_executive');
const checkApplicant = require('./shootingController/checkApplicants');
const createAssessment = require('./shootingController/createAssessment');
const deleteAssessment = require('./shootingController/deleteAssessment');

router.use(isLoggedIn,isExecutive);
//router.route('/').get();
router.route('/checkinfo').get(checkApplicant);  // management/shooting/assementinfo?date=2021-09-25
router.route('/assessment').get(createAssessment);  // management/shooting/create  : body = {date : (yyyy-mm-dd) , applicant_capacity : (int)} //post로 받기
router.route('/assessment1/:date').get(deleteAssessment);  // delete로 받기 body로 보낼지 params로 보낼지는 고민중...

module.exports = router;

