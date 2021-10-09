const {IndividualBattle ,IndividualBattleEvent} = require('../../../models');

//사격 지원의 U

updateScores = async (req,res)=>{

    try{

        // req.body.date = '2021-10-21';
        // req.body.scoreAndId = [{UserId:1,score:70},{UserId:2,score :30}];
        


        const findData = await IndividualBattle.findOne({where : {date : req.body.date}});
        if(findData == null){

            const senderror = {
                success : false,
                data : "not existing Assessment",
            }
            return res.json(senderror);
        }
       
       inputNum = 0;
       successNum = 0;
       failNum = 0;
       var failInfo = [];
       req.body.scoreAndId.forEach(element => {
            IndividualBattleEvent.update({score : element.score},{where : {UserId : element.UserId}}).then(res=>{
               seccessNum =seccessNum+1;
           }).catch(err=>{
               failNum = failNum + 1;
                info = {UserId :element.UserId };
                failInfo.push(info);
           });
           inputNum = inputNum + 1;
       });

       
        sendsuccess = {
            success : true,  
            data : {inputCnt :inputNum,successCnt : successNum, failCnt : failNum , ErrorInfo : failInfo}          
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