const {Shooting ,ShootingEvent} = require('../../../models');

createAssessment = async (req,res)=>{

    try{
       
        const body = {
            date : "2021-10-26",
            applicant_capacity : 3,
        }

        console.log(body.date);

       
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