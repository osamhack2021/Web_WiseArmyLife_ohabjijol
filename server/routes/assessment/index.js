// 병 자격 인증 신청 router

const express = require('express');
const router = express.Router();
const ShootingRouter = require('./shooting');

router.use('/shooting',ShootingRouter);


router.route('/')
.get(async (req,res)=>{   
 return res.redirect('/assessment/shooting');
});


module.exports = router;