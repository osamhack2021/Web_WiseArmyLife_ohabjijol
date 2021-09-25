const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting ,ShootingEvent} = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const e = require('express');
const { enable } = require('../../app');



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

router.route('/result').get(/*isLoggedIn,*/ async (req,res)=>{ // 사용자가 신청한 사격정보를 json으로 보내줌 이것도 월별로 줘야하나.... 귀찮은데..
    try{  
        let post = [];      

        const user = await User.findOne({
           
            include : [{
                model : Shooting,
                attributes : ['date','expired']
            }],
            where:{id : 10/* req.user.id,*/},          // 이부분 req.id 로 변경해야함 로그인 구현 완료후 수정바람
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
                res.json(data); 

               }
               else{                            // 없을시

                   res.send("신청 결과 없음");
               }

        });   
        

    }

    catch(err){
        console.error(err);
    }


});

router.route('/apply').get(/*isLoggedIn ,*/ async (req,res)=>{  // front구현 완료되면 post로 받을것

    //필요한게 머가 있을까.... 일단 user id 시간


    const body = {
        userId : req.user.id,
        date : '2021-09-25',
    };


    let shootingid = -1;
    let shootingexpired;
    let shootingNOA;
    let shootingapplicant_capacity;

   const findshootinginfo = await Shooting.findOne({
        where : {
           date : body.date, // front와 연결 후 req.body.date로 변경
        },
        attributes : ['id','expired','number_of_applicant','applicant_capacity'],

    }).then((element)=>{

        if(element){
        shootingid = element.dataValues.id;
        shootingexpired = element.dataValues.expired;
        shootingNOA = element.dataValues.number_of_applicant;
        shootingapplicant_capacity = element.dataValues.applicant_capacity;

        console.log(`사격정보 있는지 확인했음 현재 지원자수 ${shootingNOA}명 최대인원 ${shootingapplicant_capacity}명`);

    }
        else{
            res.send("Aa");
        }

    }).catch((err)=>{
        res.redirect('/assessment/shooting');
    });

    if(shootingid===-1){
        res.send("자료없음");
    }
    else{
        if(shootingexpired === 'Expired' || shootingexpired=== "Full" ){
            res.send("만료된 평가");
        }
        else{
            const addShootingEvent = await ShootingEvent.findOrCreate({
                where : {
                    UserId : req.user.id,
                    ShootingId : shootingid,
                },

            });

           const isExist = (!addShootingEvent[1])


            if(isExist){
                res.send(isExist);
            }
            else{

                shootingNOA = shootingNOA+1;

                if(shootingNOA === shootingapplicant_capacity){
                    await Shooting.update(  {number_of_applicant:shootingNOA,expired:'Full'},{
                        where : {
                            id : shootingid
                        }
                    });
                }
                else{
                    await Shooting.update(  {number_of_applicant:shootingNOA},{
                        where : {
                            id : shootingid
                        }
                    });
                }

        console.log(`사격정보 업데이트 : 지원자수 ${shootingNOA}명 최대인원 ${shootingapplicant_capacity}명`);

                res.send(

                    "사용자등록 완료함"
                );
            }


        }

    }


    

});

module.exports = router;

