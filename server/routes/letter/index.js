"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');

const CompanyRouter = require('./company');
const BattalionRouter = require('./battalion');

const router = express.Router();

router.get('/company', isLoggedIn, CompanyRouter);
router.get('/battalion', isLoggedIn, BattalionRouter);

module.exports = router;