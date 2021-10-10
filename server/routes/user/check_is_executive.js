"use strict"


exports.isExecutive = (req, res, next) => {
    if (req.user.executive) {
        next();
    } else {
        console.log(req.user.executive);
        const data = {
            message: "Not Executive",
        }
        res.json({ success: false, data });
    }
};
exports.isNotExecutive = (req, res, next) => {
    if (!req.user.executive) {
        next();
    } else {
        console.log(req.user.executive);
        const data = {
            message: "병사만 접근 가능함",
        }
        res.json({ success: false, data });
    }
};
