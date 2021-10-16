const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../user/check_login');
const {isNotExecutive} = require('../user/check_is_executive');
const getAllResult = require('./AllController/AllresultController');

router.get('/result',getAllResult);


router.use(isLoggedIn,isNotExecutive);


module.exports = router;