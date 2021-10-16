"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');

const CompanyRouter = require('./company');
const BattalionRouter = require('./battalion');

const router = express.Router();

router.get('/company', isLoggedIn, CompanyRouter);
router.get('/battalion', isLoggedIn, BattalionRouter);

// 마편 READ

module.exports = router;