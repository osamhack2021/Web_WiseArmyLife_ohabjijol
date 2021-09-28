const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive,isExecutive} = require('../user/check_is_executive');
const checkApplicant = require('./shootingController/checkApplicants');


router.use(isLoggedIn,isExecutive);
//router.route('/').get();
router.route('/checkinfo').get(checkApplicant);  // management/shooting/assementinfo?date=2021-09-25


module.exports = router;

