const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getCBRInfo = require('./cBRController/cBRinfoController');
const getCBRResult = require('./cBRController/cBRresultController');
const ApplyAssessment = require('./cBRController/cBRApplyController');
const CancelApply = require('./cBRController/cBRCancelController');

router.route('/').get(getCBRInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getCBRResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

