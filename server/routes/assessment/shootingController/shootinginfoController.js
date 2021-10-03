const {Shooting} = require('../../../models');
const {Op} = require('sequelize');
const applyController = require('../monthCheckController');


// /assessment/shooting Get으로 요청시 로그인된 유저정보를 응답해줌 또한 현재 월의 사격 정보를 응답해줌. 년도와 월은 쿼리스트링으로 받을거임
<<<<<<< HEAD
// 쿼리스트링이 없이 Get요청시 디폴드 값으로 현재 년월이 들어감 ex /assessment/shooting?year=2021&month=3

getShootingInfo = async (req,res)=>{ 

    try{     
         getDate = applyController.getThisAndNextmonth(req.query.year,req.query.month);
        thismonth = getDate.thisDate;
        nextmonth = getDate.nextDate;
=======
// 쿼리스트링이 없이 Get요청시 디폴드 값으로 현재 년월이 들어감 ex /assessment/shooting?year=2021&month=3&limit=5

getShootingInfo = async (req,res)=>{ 

    try{  
        

         getDate = applyController.getThisAndNextmonth(req.query.year,req.query.month);
        thismonth = getDate.thisDate;
        nextmonth = getDate.nextDate;

        if(req.query.limit!=undefined){
            thismonth =  new Date();
        }
        else{
            req.query.limit = null;
        }

>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        const shootingdata = await Shooting.findAll({        
            attributes : ['date','expired','applicant_capacity','number_of_applicant'],
            where : {
                date : { [Op.gte] : thismonth , [Op.lt] : nextmonth},
<<<<<<< HEAD
            }
        }
        );

        const resobject = {
            success : true,
            data : shootingdata,
            xx : req.user.id
=======
            },
            limit : parseInt(req.query.limit)||null,
        }
        );

        

        const resobject = {
            success : true,
            data : shootingdata,
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        }

        return res.json(resobject); // json 형식으로 원하는 달 사격데이터 전송      


    }

    catch(err){
        console.error(err);
        const senderror = {
            success : false,
            data : "unexpected Error",
        }

        return res.json(senderror);
    } 


}

module.exports = getShootingInfo;