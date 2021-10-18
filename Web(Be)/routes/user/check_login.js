"use strict"

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else { const data = {
        message: "로그인 팔요",
    }
    res.status(403).json({ success: false, data });
    }
};
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const data = {
            message: "로그인 상태",
        }
        res.json({ success: false, data });
    }
};