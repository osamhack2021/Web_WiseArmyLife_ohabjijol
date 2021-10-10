const { User, IndividualBattle ,IndividualBattleEvent} = require('../../../models');

//사격의 R

getIndividualBattleResult = async (req,res)=>{ // 사용자가 신청한 사격정보를 json으로 보내줌 이것도 월별로 줘야하나.... 귀찮은데..
    try{  
        let post = [];      

        const user = await User.findOne({
           
            include : [{
                model : IndividualBattle,
                attributes : ['date','time','expired']
            }],
            where:{id : req.user.id},
            attributes : ['id'],

        }).then((user1)=>{
            
            if(user1.dataValues.IndividualBattles.length!==0){ // 신청한 사격정보가 있을시

                user1.dataValues.IndividualBattles.forEach(element => {
                    post.push({
                        date : element.date,
                        expired : element.expired,
                        time : element.time,
                        score : element.IndividualBattleEvent.score 
                    })
                });

                sendsuccess = {
                    success : true,
                    data : post,
                }

                return res.json(sendsuccess); 

               }
               else{                            // 없을시

                   res.json({success : false, data : null });
               }

        });   
        

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

module.exports = getIndividualBattleResult;