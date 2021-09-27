"use strict"

    exports.isExecutive = (req, res, next) => {
        if(req.user.isExecutive){
            next();
        } else {
            console.log('간부아님');
            res.json({sucess: false})
        }
    };
    exports.isNotExecutive = (req, res, next) => {
        if(!req.user.isExecutive){
            next();
        } else {
            console.log('간부임');
            res.json({sucess: false})
        }
    };