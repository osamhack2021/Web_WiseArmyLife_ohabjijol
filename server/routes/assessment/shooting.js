const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting ,EventShooting} = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const e = require('express');



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
        let post = [];      

        const user = await User.findOne({
           
            include : [{
                model : Shooting,
                attributes : ['date','expired']
            }],
            where:{id:3,},          // 이부분 req.id 로 변경해야함 로그인 구현 완료후 수정바람
            attributes : ['id'],

        }).then((user1)=>{
            
            if(user1.dataValues.Shootings.length!==0){ // 신청한 사격정보가 있을시

                user1.dataValues.Shootings.forEach(element => {
                    post.push({
                        date : element.date,
                        expired : element.expired,
                        score : element.ShootingEvent.score                        

                    })
                   
                });

                res.json(post); 

               }
               else{                            // 없을시

                   res.send("aaaa");
               }

        });

       


        

    }

    catch(err){
        console.error(err);
    }


});

module.exports = router;

