const { CBR, CBREvent } = require('../../../models');

//화생방의 D

deleteAssessment = async (req, res) => {

    try {

        
           paramdate = req.params.date
        
           console.log(paramdate);


        let dateReg = RegExp(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/);
        if(!dateReg.test(paramdate)){
        const senderror = {
            success: false,
            data: "out of format",
        }
        return res.json(senderror);
        }


        deleteData = await CBR.destroy({ where: { date: paramdate } });
       
        if(deleteData){
        sendsuccess = {
            success : true,            
        }

        res.json(sendsuccess);
    }
    else{ 
        const senderror = {
        success: false,
        data: "not existing Assessment",
    }
    return res.json(senderror);
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

module.exports = deleteAssessment;