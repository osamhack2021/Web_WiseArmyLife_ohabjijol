"use strict"

exports.isExecutive = (req, res, next) => {
    if (req.user.Executive) {
        next();
    } else {
        console.log('간부아님');
        const data = {
            message: "Not Executive",
        }
        res.json({ sucess: false }, data);
    }
};
exports.isNotExecutive = (req, res, next) => {
    if (!req.user.Executive) {
        next();
    } else {
        console.log('간부임');
        const data = {
            message: "병사만 접근 가능함",
        }
        res.json({ sucess: false }, data);
    }
};
