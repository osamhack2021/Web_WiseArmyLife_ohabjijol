const {FirstAid ,FirstAidEvent} = require('../../../models');
const db = require('../../../models');

//구급법지원의 D 

CancelApply = async (req,res)=>{ //front구현후 delete로 받을것

    try{
    //신청한 구급법정보 있는지 확인
    console.log(req.params.date);
    let reg = RegExp(/^(19|20)\d{2}-((01|0[3-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])|(02)-(0[1-9]|1[0-9]|2[0-9]))$/)
    if(req.params.date==undefined||reg.test(req.params.date)==false){
        senderror = {
            success : false,
            data : "invalid format"
        }
        return res.send(senderror);
    }


    const findFirstAid = await FirstAid.findOne({
        where : {date : req.params.date},
      attributes : ['id','expired','number_of_applicant']  
    });

    const findeventFirstAid = await FirstAidEvent.findOne({
        where : {UserId:req.user.id, FirstAidId : findFirstAid.dataValues.id}
    });


    if(findeventFirstAid!==null){

        if(findFirstAid.dataValues.expired==="Expired"){
            
            senderror = {
                success : false,
                data : "expired assessment"
            }
            return res.send(senderror);
        }
        else{
            await FirstAidEvent.destroy({where:{UserId:req.user.id,
                FirstAidId:findFirstAid.dataValues.id}});
            
          
            await FirstAid.update({ number_of_applicant : db.sequelize.literal('number_of_applicant - 1') , expired : "Applying" }, {
                where: {
                    id: findFirstAid.dataValues.id
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