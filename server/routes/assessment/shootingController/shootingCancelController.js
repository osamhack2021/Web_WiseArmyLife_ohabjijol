const {Shooting ,ShootingEvent} = require('../../../models');
const db = require('../../../models');

 
CancelApply = async (req,res)=>{ //front구현후 delete로 받을것

    try{
    //신청한 사격정보 있는지 확인

        data = {
            date : '2021-10-25'
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
            
          
            await Shooting.update({ number_of_applicant : db.sequelize.literal('number_of_applicant - 1') , expired : "Applying" }, {
                where: {
                    id: findShooting.dataValues.id
                }
                
            });

        }

        sendsuccess = {
            success : true,
            data : "success"
        }
        return res.send(sendsuccess);


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

        const senderror = {
            success : false,
            data : "unexpected Error",
        }
        return res.json(senderror);
    }

}

module.exports = CancelApply;