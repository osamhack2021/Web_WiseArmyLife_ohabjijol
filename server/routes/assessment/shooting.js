const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getShootingInfo = require('./shootingController/shootinginfoController');
const getShootingResult = require('./shootingController/shootingresultController');
const ApplyAssessment = require('./shootingController/shootingApplyController');
const CancelApply = require('./shootingController/shootingCancelController');
const syncShootingAssessment = require('./shootingController/shootingassessmentsync');

router.route('/').get(getShootingInfo);
router.route('/sync').get(syncShootingAssessment);

<<<<<<< HEAD
router.use(isLoggedIn/*,isNotExecutive*/);
=======
router.use(isLoggedIn,isNotExecutive);
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
router.route('/result').get(getShootingResult);
router.route('/apply').get(ApplyAssessment); // post로 작성 body = {userId : (int) , date : 'yyyy-mm-dd'}
router.route('/cancellation').get(CancelApply);




module.exports = router;

