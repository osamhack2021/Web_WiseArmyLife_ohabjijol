const {Shooting} = require('../../../models');

const {Op} = require('sequelize');


syncShootingAssessment = async () => { // 매시간 00분 1초 마다 함수 실행 배포후 '* * 0 * * *'으로 변경해야함

    try{
    
      var now1 = new Date();
      now1.setHours(now1.getHours()+9);
      var year = now1.getFullYear();
      var month = (now1.getMonth()+1).toString().padStart(2, '0');
      var day = now1.getDate().toString().padStart(2, '0');
      console.log(now1);
      var today = year + month + day;
    
      var toChange = "Expired"
    
      const aa = await Shooting.update({expired : "Expired",updatedAt : now1},
      {where : {
          date : { [Op.lte] : today },
          [Op.not] :{expired: "Expired"}
      }}
      )
      
      console.log("db업데이트");
    }
    catch(err){
      console.log(err);
    
    }
    }

    module.exports = syncShootingAssessment ;