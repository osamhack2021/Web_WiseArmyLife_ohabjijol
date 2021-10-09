// 병 자격 인증 관리페이지 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');
const MakingQuestionRouter = require('./question_making');
const MentalForceRouter = require('./mentalForce');
const CBRRouter = require('./cBR');
const FirstAidRouter = require('./firstAid');



router.use('/shooting',ShootingRouter);
router.use('/question',MakingQuestionRouter);
router.use('/mentalforce',MentalForceRouter);
router.use('/CBR',CBRRouter);
router.use('/firstAid',FirstAidRouter);

router.route('/')
.get(async (req,res)=>{   
 await res.redirect('/management/shooting');
});


module.exports = router;