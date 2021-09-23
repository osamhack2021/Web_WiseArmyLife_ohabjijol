const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting ,EventShooting} = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');
const { mountpath } = require('../../app');




router.route('/').get( async (req,res)=>{ // apply/id/shooting Get으로 요청시 로그인된 유저정보를 응답해줌 또한 현재 월의 사격 정보를 응답해줌. 년도와 월은 쿼리스트링으로 받을거임
                                                    // 쿼리스트링이 없이 Get요청시 디폴드 값으로 현재 년월이 들어감 ex /apply/shooting?year=2021&month=3

    try{     
        if(req.query.month == undefined||req.query.year == undefined){
            thismonth = applyController.getThismonth(undefined,undefined);
            nextmonth = applyController.getNextMonth(undefined,undefined);
        }

        else{            
            month = req.query.month;
            year = req.query.year;  
            console.log(month,"+",year);
            thismonth =  applyController.getThismonth(year,month);
            nextmonth =  applyController.getNextMonth(year,month);
        }

        console.log(req.url);
        const shootingdata = await Shooting.findAll({        
            attributes : ['date','expired','applicant_capacity','number_of_applicant'],
            where : {
                date : { [Op.between] : [thismonth , nextmonth ]},
            }
        }
        );

        const resobject = {
            shootingdata : shootingdata,
        }

        res.json(resobject.shootingdata); // json 형식으로 원하는 달 사격데이터 전송      


    }

    catch(err){
        console.error(err);
    } 


});
router.route('/apply').get(async (req,res)=>{ // apply/id/shooting Post로 요청시 사용자가 신청한 시간을 db에 올려줌
    
   
    try{
/*
        const shootingdata = await db.sequelize.models.eventsShooting.findAll({
            where : {
                UserId : 3
            },
            attributes : ['userId','shootingId','grade'],
        });
        */

        const  shootingdata = await User.findOne({
            where : {
                id : 3
            },
        });

        let post = [];

        if(shootingdata){
            post = await shootingdata.getShootings({ where : {expired : 'Applying'} , attributes : ['date','expired']});
        } // where 가 작동안함 손좀 봐야함
        

       res.send(post );
    }

    catch(err){
        console.error(err);
    }


});

module.exports = router;

[{"id":2,"date":"2021-09-25T00:00:00.000Z","expired":"Applying","applicant_capacity":0,"number_of_applicant":0,"createdAt":null,
"updatedAt":null,"Users":[{"id":3,"militaryNumber":"123123","name":"1","password":"$2b$12$wTLVN6i9Ji/5XR1PzkU4rumXEWImrA2q./iW03uu67L4hY.d69TJO",
"unit":"1","isExecutive":true,"createdAt":"2021-09-22T06:06:14.000Z","updatedAt":"2021-09-22T06:06:14.000Z","eventsShooting":
{"createdAt":null,"updatedAt":null,"UserId":3,"ShootingId":2}}],"eventsShooting":{"createdAt":null,"updatedAt":null,"UserId":3,"ShootingId":2}}]