const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getSpecialityInfo = require('./specialityController/specialityinfoController');
const getSpecialityResult = require('./specialityController/specialityresultController');
const ApplyAssessment = require('./specialityController/specialityApplyController');
const CancelApply = require('./specialityController/specialityCancelController');


router.route('/').get(getSpecialityInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getSpecialityResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

