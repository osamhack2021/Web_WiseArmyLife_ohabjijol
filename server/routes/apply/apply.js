// 병 자격 인증 신청 router

const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting } = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');




router.route('/shooting').get( async (req,res)=>{ // apply/id/shooting Get으로 요청시 로그인된 유저정보를 응답해줌 또한 현재 월의 사격 정보를 응답해줌.

    try{      
        
        console.log(req.url);
        const shootingdata = await Shooting.findAll({        
            attributes : ['date','expired','applicant_capacity','number_of_applicant'],
            where : {
                date : { [Op.between] : [shearchtimeFrom , shearchtimeTo ]},
            }
        }
        );

        const resobject = {
            shootingdata : shootingdata,
        }

        res.json(resobject.shootingdata);     
        


    }

    catch(err){
        console.error(err);
    } 


}).post(async (req,res)=>{// apply/id/shooting Post로 요청시 사용자가 신청한 시간을 db에 올려줌
    
    try{

       console.log("aa");

    }

    catch(err){
        console.error(err);
    }


});

router.route('/')
.get(async (req,res)=>{
   
 await res.redirect('/apply/shooting');

});


module.exports = router;