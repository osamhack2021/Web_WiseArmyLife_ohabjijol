"use strict"

    exports.isExecutive = (req, res, next) => {
        if(req.user.isExecutive){
            next();
        } else {
            console.log('간부아님');
            res.json({sucess: false, message: 'is not executive'})
        }
    };
    exports.isNotExecutive = (req, res, next) => {
        if(!req.user.isExecutive){
            next();
        } else {
            console.log('간부임');
            res.json({sucess: false, message: 'is executive'})
        }
    };