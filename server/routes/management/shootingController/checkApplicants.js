const {Shooting ,ShootingEvent} = require('../../../models');

checkApplicant = async (req,res)=>{

    try{


       
        // management/shooting/assementinfo?date=2021-09-25
        
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
/*
        findUserId = await ShootingEvent.findAll({where:{ShootingId : findShooting.dataValues.id},
        attributes : ['UserId','score']
        });

        findUserId.forEach(findUserId => {
            console.log(findUserId.dataValues);
            findUserId.dataValues.UserId // 이걸 통해 데이터 접근?
        });

      //  console.log(findUserId);
*/
        const findUser = await findShooting.getUsers({attributes : ['name','militaryNumber']});
        post =[];
        findUser.forEach(element => {
            postdata ={
            name : element.dataValues.name,
            militaryNumber : element.dataValues.militaryNumber,
            score:element.dataValues.ShootingEvent.score,}  ;
                post.push(postdata);
            
        }
        );
        res.json(post);

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