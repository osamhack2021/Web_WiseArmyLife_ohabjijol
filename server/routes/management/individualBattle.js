const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive,isExecutive} = require('../user/check_is_executive');
const checkApplicant = require('./individualBattleController/checkApplicants');
const createAssessment = require('./individualBattleController/createAssessment');
const deleteAssessment = require('./individualBattleController/deleteAssessment');

const updateScores = require('./individualBattleController/updateScores');
//const updateAssessment = require('./individualBattleController/updateAssessment');

router.use(isLoggedIn,isExecutive);


router.route('/checkinfo').get(checkApplicant);  // management/individualBattle/assementinfo?date=2021-09-25
router.route('/assessment').post(createAssessment);  // management/individualBattle/create  : body = {date : (yyyy-mm-dd) , applicant_capacity : (int)} //post로 받기
router.route('/assessment/:date').delete(deleteAssessment);  // delete로 받기 body로 보낼지 params로 보낼지는 고민중...
router.route('/scores').patch(updateScores);  /* Patch로 받기! body에는 body = {
                                                        date : '2021-10-21',
                                                     scoreAndId = [{UserId:1,score:70},{UserId:2,score :30}]
                                                    } 이런식의 형식임*/                                                       
//router.route('/assessment').patch(updateAssessment);


module.exports = router;

