const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getShootingInfo = require('./shootingController/shootinginfoController');
const getShootingResult = require('./shootingController/shootingresultController');
const ApplyAssessment = require('./shootingController/shootingApplyController');
const CancelApply = require('./shootingController/shootingCancelController');


router.route('/').get(getShootingInfo);
router.route('/result').get(isLoggedIn,isNotExecutive,getShootingResult);
router.route('/apply').get(isLoggedIn,isNotExecutive,ApplyAssessment); // post로 작성
router.route('/cancellation').get(isLoggedIn,isNotExecutive,CancelApply);




module.exports = router;

