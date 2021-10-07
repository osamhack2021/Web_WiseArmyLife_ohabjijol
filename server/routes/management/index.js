// 병 자격 인증 관리페이지 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');
const MakingQuestionRouter = require('./question_making');
router.use('/shooting',ShootingRouter);
router.use('/question',MakingQuestionRouter);
router.route('/')
.get(async (req,res)=>{   
 await res.redirect('/management/shooting');
});


module.exports = router;