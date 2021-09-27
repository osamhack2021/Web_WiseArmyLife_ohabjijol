const express = require('express');
const router = express.Router();
const { User, Shooting ,ShootingEvent} = require('../../models');
const {Op} = require('sequelize');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const getShootingInfo = require('./shootingController/shootinginfoController');
const getShootingResult = require('./shootingController/shootingresultController');
const ApplyAssessment = require('./shootingController/shootingApplyController');
const CancelApply = require('./shootingController/shootingCancelController');

router.route('/').get(getShootingInfo);
router.route('/result').get(isLoggedIn,getShootingResult);
router.route('/apply').get(isLoggedIn ,ApplyAssessment);
router.route('/cancellation').get(isLoggedIn,CancelApply);


module.exports = router;

