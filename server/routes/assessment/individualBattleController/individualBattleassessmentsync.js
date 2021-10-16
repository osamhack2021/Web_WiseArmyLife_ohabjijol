const {IndividualBattle} = require('../../../models');

const {Op} = require('sequelize');


// 매일 yy시 각개전투정보 Expired 유무 파악후 db Update

syncIndividualBattleAssessment = async () => {

    try{
    
      var now1 = new Date();
      now1.setHours(now1.getHours()+9);
      var year = now1.getFullYear();
      var month = (now1.getMonth()+1).toString().padStart(2, '0');
      var day = now1.getDate().toString().padStart(2, '0');
      console.log(now1);
      var today = year + month + day;
    
      var toChange = "Expired"
    
      const aa = await IndividualBattle.update({expired : "Expired",updatedAt : now1},
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

    module.exports = syncIndividualBattleAssessment ;