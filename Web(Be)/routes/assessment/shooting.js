const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getShootingInfo = require('./shootingController/shootinginfoController');
const getShootingResult = require('./shootingController/shootingresultController');
const ApplyAssessment = require('./shootingController/shootingApplyController');
const CancelApply = require('./shootingController/shootingCancelController');


router.route('/').get(getShootingInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getShootingResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

