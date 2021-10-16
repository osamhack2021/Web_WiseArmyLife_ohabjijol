const { Strength } = require('../../../models');
const { Op } = require('sequelize');
const applyController = require('../monthCheckController');


// /assessment/strength Get으로 요청시 로그인된 유저정보를 응답해줌 또한 현재 월의 체력 정보를 응답해줌. 년도와 월은 쿼리스트링으로 받을거임
// 쿼리스트링이 없이 Get요청시 디폴드 값으로 현재 년월이 들어감 ex /assessment/strength?year=2021&month=3&limit=5

getStrengthInfo = async (req, res) => {



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

        const strengthdata = await Strength.findAll({        
            attributes : ['date','time','expired','applicant_capacity','number_of_applicant'],
            where : {
                date : { [Op.gte] : thismonth , [Op.lt] : nextmonth},
            },
            limit : parseInt(req.query.limit)||null,
        }
        );

        

        const resobject = {
            success : true,
            data : strengthdata
        }

        return res.json(resobject); // json 형식으로 원하는 달 체력데이터 전송      


    }

    catch (err) {
        console.error(err);
        const senderror = {
            success: false,
            data: "unexpected Error",
        }

        return res.json(senderror);
    }


}

module.exports = getStrengthInfo;