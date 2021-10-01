const {Shooting ,ShootingEvent} = require('../../../models');

//사격의 C

createAssessment = async (req,res)=>{

    try{
       
        const body = {
            date : "2021-10-21", // 21년 10월 26
            applicant_capacity : 3,
        }

        console.log(body.date);
        var gettime = new Date(body.date);
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

       
        const createShootingAssessment = await Shooting.findOrCreate({
            where : {
                date : body.date,
                
            },
            defaults : {
                date : body.date,
                applicant_capacity : body.applicant_capacity,
                number_of_applicant : 0,
                expired:"Applying"
            }

        });

        console.log(createShootingAssessment[1]);

        const isExist = !createShootingAssessment[1];
        
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