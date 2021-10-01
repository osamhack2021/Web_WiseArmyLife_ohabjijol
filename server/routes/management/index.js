// 병 자격 인증 관리페이지 router

const express = require('express');
const router = express.Router();

router.route('/')
.get(async (req,res)=>{   
 await res.redirect('/management/shooting');
});


module.exports = router;