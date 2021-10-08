const axios =require('axios');
const {MentalForce ,MentalForceEvent} = require('../../../models');

//사격의 C

createAssessment = async (req,res)=>{

    try{
       
        

        console.log(req.body.date);
        var gettime = new Date(req.body.date);
        var Nowtime = new Date();
        Nowtime.setHours(Nowtime.getHours()+9);
        Nowtime.setHours(0); // 21년 10월 25
        Nowtime.setMinutes(0) // 21년 10월 25
        Nowtime.setSeconds(0)
        Nowtime.setUTCMilliseconds(0);


        console.log(gettime,Nowtime );
        if(gettime <= Nowtime){
    
            const senderror = {
                success: false,
                data: "cannot create on the day",
            }
            return res.json(senderror);
        }

        
       //여기서 태현이형이 만든 시험 가져올 것 {id : int} 문제 아이디만 줘도 될듯. 만든 사격 아이디 + 가져온 시험정보id bulkCreate통해 사격평가와 문제를 N:M관계로 만듬

       
        const createMentalForceAssessment = await MentalForce.findOrCreate({
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



        console.log(createMentalForceAssessment[1]);

        const isExist = !createMentalForceAssessment[1];
        
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