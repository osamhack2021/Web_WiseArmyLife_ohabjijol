const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const { User, Shooting ,ShootingEvent} = require('../../models');
const {Op} = require('sequelize');
const applyController = require('./monthCheckController');
const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');



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
                date : { [Op.gte] : thismonth , [Op.lt] : nextmonth},
            }
        }
        );

        const resobject = {
            success : true,
            data : shootingdata,
        }

        res.json(resobject); // json 형식으로 원하는 달 사격데이터 전송      


    }

    catch(err){
        console.error(err);
        const resobject = {
            success : false,
            data : "unexpected Error",
        }

        res.json(resobject);
    } 


});
router.route('/result').get(isLoggedIn, async (req,res)=>{ // 사용자가 신청한 사격정보를 json으로 보내줌 이것도 월별로 줘야하나.... 귀찮은데..
    try{  
        let post = [];      

        const user = await User.findOne({
           
            include : [{
                model : Shooting,
                attributes : ['date','expired']
            }],
            where:{id : req.user.id},
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

                responseData = {
                    success : true,
                    data : post,
                   
                }
                res.json(responseData); 

               }
               else{                            // 없을시

                   res.json({success : false, data : null });
               }

        });   
        

    }

    catch(err){

        console.error(err);

        const resobject = {
            success : false,
            data : "unexpected Error",
        }

        res.json(resobject);
    }


});
router.route('/apply').get(isLoggedIn , async (req,res)=>{  // front구현 완료되면 post로 받을것

    //필요한게 머가 있을까.... 일단 user id 시간

    try {

        

        const body = {
            userId: req.user.id,
            date: '2021-09-25',
        };


        let shootingid = -1;
        let shootingexpired;
        let shootingNOA;
        let shootingapplicant_capacity;

        const findshootinginfo = await Shooting.findOne({ // 받아온 사격 일정이 있는지 확인
            where: {
                date: body.date, // front와 연결 후 req.param.date로 변경
            },
            attributes: ['id', 'expired', 'number_of_applicant', 'applicant_capacity'],

        }).then((element) => {

            if (element) {
                shootingid = element.dataValues.id;
                shootingexpired = element.dataValues.expired;
                shootingNOA = element.dataValues.number_of_applicant;
                shootingapplicant_capacity = element.dataValues.applicant_capacity;

                console.log(`사격정보 있는지 확인했음 현재 지원자수 ${shootingNOA}명 최대인원 ${shootingapplicant_capacity}명 현재상태 ${shootingexpired}`);

            }
            else { // 검색한 사격 일정이 없을때
                senderror = {
                    success : false,
                    data : "not exist info"
                }
                return res.send(senderror);
            }

        }).catch((err) => {
            res.redirect('/assessment/shooting');
        });

        if (shootingid === -1) { // ㅋㅋㅋㅋ 이거 왜 만들었지 이것도 사격일정이 없는거임
            
            senderror = {
                success : false,
                data : "not exist info"
            }
            return res.send(senderror);
        }
        else { // 사격이 만료되었거나 인원이 꽉 차 있을 경우
            if (shootingexpired === 'Expired') {
                senderror = {
                    success : false,
                    data : "expired assessment"
                }
                return res.send(senderror);
            }
            else if (shootingexpired === "Full"){
                senderror = {
                    success : false,
                    data : "Full assessment"
                }
                return res.send(senderror);
                
            }
            else {
                const addShootingEvent = await ShootingEvent.findOrCreate({
                    where: {
                        UserId: req.user.id,
                        ShootingId: shootingid,
                      
                    },

                });

                const isExist = (!addShootingEvent[1])


                if (isExist) {
                    
                    senderror = {
                        success : false,
                        data : "already applied"
                    }
                    return res.send(senderror);

                }
                else {

                    shootingNOA = shootingNOA + 1;

                    if (shootingNOA === shootingapplicant_capacity) {
                        await Shooting.update({ number_of_applicant: shootingNOA, expired: 'Full' }, {
                            where: {
                                id: shootingid
                            }
                        });
                    }
                    else {
                        await Shooting.update({ number_of_applicant: shootingNOA }, {
                            where: {
                                id: shootingid
                            }
                        });
                    }

                    console.log(`사격정보 업데이트 : 지원자수 ${shootingNOA} 명 최대인원 ${shootingapplicant_capacity}명`);

                    sendsucces = {
                        success : true,
                        data : "success"
                    }
                    return res.send(sendsucces);
                }


            }

        }
    }
    catch (err) {

        console.error(err);

        const resobject = {
            success : false,
            data : "unexpected Error",
        }
        res.json(resobject);
    }


    

});

router.route('/cancellation').get(isLoggedIn, async (req,res)=>{ //front구현후 delete로 받을것

    try{
    //신청한 사격정보 있는지 확인

        data = {
            date : '2021-09-25'
        }

    const findShooting = await Shooting.findOne({
        where : {date : data.date},
      attributes : ['id','expired','number_of_applicant']  
    });/*.then(id=>{
        if(id.dataValues.id.length!==undefined){
           return res.send("삭제할 데이터를 못찾음");
        }
    });*/

    const findeventShooting = await ShootingEvent.findOne({
        where : {UserId:req.user.id, ShootingId : findShooting.dataValues.id}
    });


    if(findeventShooting!==null){

        if(findShooting.dataValues.expired==="Expired"){
            
            senderror = {
                success : false,
                data : "expired assessment"
            }
            return res.send(senderror);
        }
        else{
            await ShootingEvent.destroy({where:{UserId:req.user.id,
                ShootingId:findShooting.dataValues.id}});
            
            if(findShooting.dataValues.expired==="Applying"){
                await Shooting.update({ number_of_applicant: findShooting.dataValues.number_of_applicant - 1 }, {
                    where: {
                        id: findShooting.dataValues.id
                    }
                });
                console.log("삭제됨");
            }
            else{
                console.log(findShooting.dataValues.number_of_applicant - 1 ); // findShooting.dataValues.number_of_applicant - 1 이부분 수정해야함
            await Shooting.update({ number_of_applicant: findShooting.dataValues.number_of_applicant - 1 , expired : "Applying" }, {
                where: {
                    id: findShooting.dataValues.id
                }
                
            });
            console.log("삭제됨");

            
        }
        }

        sendsucces = {
            success : true,
            data : "success"
        }
        return res.send(sendsucces);


    }
    else{
        senderror = {
            success : false,
            data : "not existing info"
        }
        return res.send(senderror);
    }


    }
    catch(err){
        console.error(err);

        const resobject = {
            success : false,
            data : "unexpected Error",
        }
        res.json(resobject);
    }

});


module.exports = router;

