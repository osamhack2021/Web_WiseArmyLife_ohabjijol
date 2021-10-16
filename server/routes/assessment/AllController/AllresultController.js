const { User, MentalForce ,Shooting ,CBR,FirstAid,IndividualBattle,Speciality,Strength} = require('../../../models');

//사격의 R

getAllResult = async (req,res)=>{ // 사용자가 신청한 사격정보를 json으로 보내줌 이것도 월별로 줘야하나.... 귀찮은데..
    try{  
        //사격
        let post = [];      
        const user = User.findOne({
            include : [{
                model : Shooting,
                attributes : ['date','time','expired']
            },
            {
                model : MentalForce,
                attributes : ['date','time','expired']
            },
            {
                model : CBR,
                attributes : ['date','time','expired']
            },
            {
                model : FirstAid,
                attributes : ['date','time','expired']
            },
            {
                model : IndividualBattle,
                attributes : ['date','time','expired']
            }, {
                model : Speciality,
                attributes : ['date','time','expired']
            },
            {
                model : Strength,
                attributes : ['date','time','expired']
            }
        
        ],
            where:{id : req.user.id},
            attributes : ['id'],

        }).then((user1)=>{
            
            if(user1.dataValues.Shootings.length!==0){ // 신청한 사격정보가 있을시
                let shootingarr =[]
                user1.dataValues.Shootings.forEach(element => {
                    shootingarr.push({
                        date : element.date,
                        expired : element.expired,
                        time : element.time,
                        score : element.ShootingEvent.score 
                    })
                });
                
                getsuccess = {
                    target : 'shooting',
                    data : shootingarr,
                }

                post.push();


                }
               else{                            // 없을시
            
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

module.exports = getAllResult;