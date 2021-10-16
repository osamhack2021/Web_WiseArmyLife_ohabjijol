const {IndividualBattle ,IndividualBattleEvent} = require('../../../models');

//각개전투의 C

createAssessment = async (req,res)=>{

    try{
       
        

        var gettime = new Date(req.body.date);
        var Nowtime = new Date();
        Nowtime.setHours(Nowtime.getHours()+9);
        Nowtime.setHours(0); // 21년 10월 25
        Nowtime.setMinutes(0) // 21년 10월 25
        Nowtime.setSeconds(0)
        Nowtime.setUTCMilliseconds(0);


        if(gettime <= Nowtime){
    
            const senderror = {
                success: false,
                data: "cannot create on the day",
            }
            return res.json(senderror);
        }

        
       
        const createIndividualBattleAssessment = await IndividualBattle.findOrCreate({
            where : {
                date : req.body.date,
                
            },
            defaults : {
                date : req.body.date,
                time : req.body.time,
                applicant_capacity : req.body.applicant_capacity,
                number_of_applicant : 0,
                expired:"Applying"
            }

        });


        const isExist = !createIndividualBattleAssessment[1];
        
        if(isExist){

            const senderror = {
                success: false,
                data: "Already Existing Assessment",
            }
            return res.json(senderror);
        }
        else{

            sendsuccess = {
                success : true,            
            }
    
            res.json(sendsuccess);

        }

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

module.exports = createAssessment;