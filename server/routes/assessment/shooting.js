const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting ,ShootingEvent} = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const e = require('express');



router.route('/').get( async (req,res)=>{ // /assessment/shooting Get으로 요청시 로그인된 유저정보를 응답해줌 또한 현재 월의 사격 정보를 응답해줌. 년도와 월은 쿼리스트링으로 받을거임
                                                    // 쿼리스트링이 없이 Get요청시 디폴드 값으로 현재 년월이 들어감 ex /assessment/shooting?year=2021&month=3

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

router.route('/result').get(isLoggedIn,async (req,res)=>{ // 사용자가 신청한 사격정보를 json으로 보내줌 이것도 월별로 줘야하나.... 귀찮은데..
    try{  
        let post = [];      

        const user = await User.findOne({
           
            include : [{
                model : Shooting,
                attributes : ['date','expired']
            }],
            where:{id:10,},          // 이부분 req.id 로 변경해야함 로그인 구현 완료후 수정바람
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

                data = {
                    ShootingInfo : post,
                   
                }
                console.log(req.id);
                res.json(data); 

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

router.route('apply').post(isLoggedIn , async (req,res)=>{

    //필요한게 머가 있을까.... 일단 user id 시간


    const body = {
        userId : 10,
        date : '2021-09-25',


    };


    const shootingid = -1;

   const findshootinginfo = await Shooting.findOne({
        where : {
            where : body.date,
        },
        attributes : ['id','expired','number_of_applicant','applicant_capacity'],

    }).then((element)=>{

        

    });


});

module.exports = router;

