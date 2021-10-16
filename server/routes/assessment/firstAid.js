const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getFirstAidInfo = require('./firstAidController/firstAidinfoController');
const getFirstAidResult = require('./firstAidController/firstAidresultController');
const ApplyAssessment = require('./firstAidController/firstAidApplyController');
const CancelApply = require('./firstAidController/firstAidCancelController');


router.route('/').get(getFirstAidInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getFirstAidResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

