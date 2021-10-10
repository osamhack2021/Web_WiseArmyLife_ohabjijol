let postshooting = [];      
        const user = User.findOne({
            include : [{
                model : Shooting,
                attributes : ['date','time','expired']
            }],
            where:{id : req.user.id},
            attributes : ['id'],

        }).then((user1)=>{
            
            if(user1.dataValues.Shootings.length!==0){ // 신청한 사격정보가 있을시

                user1.dataValues.Shootings.forEach(element => {
                    post.push({
                        date : element.date,
                        expired : element.expired,
                        time : element.time,
                        score : element.ShootingEvent.score 
                    })
                });
                
                sendsuccess = {
                    target : 'shooting',
                    data : post,
                }

                }
               else{                            // 없을시
            
                }
        });