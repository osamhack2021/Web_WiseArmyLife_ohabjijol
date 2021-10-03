"use strict"

    exports.isExecutive = (req, res, next) => {
        if(req.user.Executive){
            next();
        } else {
            console.log('간부아님');
            res.json({sucess: false , data : "Not Executive"});
        }
    };
    exports.isNotExecutive = (req, res, next) => {
        if(!req.user.Executive){
            next();
        } else {
            console.log('간부임');
            res.json({sucess: false , data : "병사만 접근 가능함"});
        }
    };
