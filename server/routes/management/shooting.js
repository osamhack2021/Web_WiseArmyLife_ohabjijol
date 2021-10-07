const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive,isExecutive} = require('../user/check_is_executive');
const checkApplicant = require('./shootingController/checkApplicants');
const createAssessment = require('./shootingController/createAssessment');
const deleteAssessment = require('./shootingController/deleteAssessment');

;
const updateScores = require('./shootingController/updateScores');
const updateAssessment = require('./shootingController/updateAssessment');

router.use(isLoggedIn,isExecutive);

//router.route('/').get();
router.route('/checkinfo').get(checkApplicant);  // management/shooting/assementinfo?date=2021-09-25
router.route('/assessment').post(createAssessment);  // management/shooting/create  : body = {date : (yyyy-mm-dd) , applicant_capacity : (int)} //post로 받기
router.route('/assessment/:date').delete(deleteAssessment);  // delete로 받기 body로 보낼지 params로 보낼지는 고민중...
router.route('/scores').patch(updateScores);  /* Patch로 받기! body에는 body = {
                                                        date : '2021-10-21',
                                                     scoreAndId = [{UserId:1,score:70},{UserId:2,score :30}]
                                                    } 이런식의 형식임*/                                                       
//router.route('/assessment').patch(updateAssessment);


module.exports = router;

