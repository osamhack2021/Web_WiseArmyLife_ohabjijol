// 병 자격 인증 신청 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');
const CBRRouter = require('./cBR');
const FirstAidRouter = require('./firstAid');


//
const resultCtrl = 1;

router.use('/shooting',ShootingRouter);
router.use('/cBR',CBRRouter);
router.use('/firstAid',FirstAidRouter);



router.route('/result')
.get();


module.exports = router;