const {Shooting ,ShootingEvent} = require('../../../models');

checkApplicant = async (req,res)=>{

    try{
       
        const findShooting = await Shooting.findOne({where : {
            date : req.query.date,
        },
        attributes : ['id'],
    });

    //console.log(findShooting);
    
    if(findShooting == null){
        const senderror = {
            success: false,
            data: "Not found",
        }
        return res.json(senderror);
    }

    else{
        const findUser = await findShooting.getUsers({attributes : ['name','militaryNumber']});
        var post = [];
        findUser.forEach(element => {
            postdata ={
            name : element.dataValues.name,
            militaryNumber : element.dataValues.militaryNumber,
            score:element.dataValues.ShootingEvent.score,}  ;
                post.push(postdata);
            
        }
        );
        
        sendsuccess = {
            success : true,
            data : {shootingdate : req.query.date, 
                userinfo : post
                    
            }

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

module.exports = checkApplicant;