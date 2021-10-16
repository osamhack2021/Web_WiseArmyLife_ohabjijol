const {Shooting ,ShootingEvent} = require('../../../models');
const db = require('../../../models');

//사격지원의 D 

CancelApply = async (req,res)=>{ //front구현후 delete로 받을것

    try{
    //신청한 사격정보 있는지 확인
    console.log(req.params.date);
    let reg = RegExp(/^(19|20)\d{2}-((01|0[3-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])|(02)-(0[1-9]|1[0-9]|2[0-9]))$/)
    if(req.params.date==undefined||reg.test(req.params.date)==false){
        senderror = {
            success : false,
            data : "invalid format"
        }
        return res.send(senderror);
    }


    const findShooting = await Shooting.findOne({
        where : {date : req.params.date},
      attributes : ['id','expired','number_of_applicant']  
    });

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