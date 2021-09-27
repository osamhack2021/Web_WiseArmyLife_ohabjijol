const { User, Shooting ,ShootingEvent} = require('../../../models');
 
CancelApply = async (req,res)=>{ //front구현후 delete로 받을것

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
        return res.json(resobject);
    }

}

module.exports = CancelApply;