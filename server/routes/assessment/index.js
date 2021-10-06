// 병 자격 인증 신청 router

const express = require('express');
const router = express.Router();

router.route('/')
.get(async (req,res)=>{   
 return res.redirect('/assessment/shooting');
});


module.exports = router;