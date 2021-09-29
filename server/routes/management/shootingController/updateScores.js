const {Shooting ,ShootingEvent} = require('../../../models');

//사격 지원의 U

updateScores = async (req,res)=>{

    try{
       
       
        sendsuccess = {
            success : true,            
        }

        res.json(sendsuccess);

    
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

module.exports = updateScores;