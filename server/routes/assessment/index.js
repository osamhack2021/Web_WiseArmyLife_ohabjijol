// 병 자격 인증 신청 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');
const CBRRouter = require('./cBR');
const FirstAidRouter = require('./firstAid');
const IndividualBattleRouter = require('./individualBattle');
const SpecialityRouter = require('./speciality');
const StrengthRouter = require('./strength');
const AllRouter = require('./All');


router.use('/All',AllRouter)
router.use('/shooting',ShootingRouter);
router.use('/cBR',CBRRouter);
router.use('/firstAid',FirstAidRouter);
router.use('/individualBattle',IndividualBattleRouter);
router.use('/speciality',SpecialityRouter);
router.use('/strength',StrengthRouter);
    


router.route('/result')
.get();


module.exports = router;