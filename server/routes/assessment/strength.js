const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getStrengthInfo = require('./strengthController/strengthinfoController');
const getStrengthResult = require('./strengthController/strengthresultController');
const ApplyAssessment = require('./strengthController/strengthApplyController');
const CancelApply = require('./strengthController/strengthCancelController');


router.route('/').get(getStrengthInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getStrengthResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

