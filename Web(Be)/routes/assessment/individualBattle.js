const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getIndividualBattleInfo = require('./individualBattleController/individualBattleinfoController');
const getIndividualBattleResult = require('./individualBattleController/individualBattleresultController');
const ApplyAssessment = require('./individualBattleController/individualBattleApplyController');
const CancelApply = require('./individualBattleController/individualBattleCancelController');


router.route('/').get(getIndividualBattleInfo);
router.use(isLoggedIn,isNotExecutive);
router.route('/result').get(getIndividualBattleResult);
router.route('/application').post(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/application/:date').delete(CancelApply);




module.exports = router;

