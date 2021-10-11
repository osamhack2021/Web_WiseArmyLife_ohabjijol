// 병 자격 인증 관리페이지 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');
const MakingQuestionRouter = require('./question_making');
const MentalForceRouter = require('./mentalForce');
const CBRRouter = require('./cBR');
const FirstAidRouter = require('./firstAid');
const IndividualBattleRouter = require('./individualBattle');
const SpecialityRouter = require('./speciality');
const StrengthRouter = require('./strength');



router.use('/shooting',ShootingRouter);
router.use('/mentalforce',MentalForceRouter);
router.use('/CBR',CBRRouter);
router.use('/firstAid',FirstAidRouter);
router.use('/individualBattle',IndividualBattleRouter);
router.use('/speciality',SpecialityRouter);
router.use('/strength',StrengthRouter);


router.use('/question',MakingQuestionRouter);


router.route('/')
.get(async (req,res)=>{   
 await res.redirect('/management/shooting');
});


module.exports = router;