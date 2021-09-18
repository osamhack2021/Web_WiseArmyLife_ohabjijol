"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

/* GET home page. */
router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/profile', ctrl.output.profile);
router.get('/join', ctrl.output.join);
router.post('/login', ctrl.process.login);

module.exports = router;
