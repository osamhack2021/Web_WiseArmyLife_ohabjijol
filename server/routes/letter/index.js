"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
<<<<<<< HEAD
=======
const { User, Post, Comment, Forum } = require('../../models');
const PostRouter = require('../community/post');
const { isNotExecutive, isExecutive } = require('../user/check_is_executive');
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a

const CompanyRouter = require('./company');
const BattalionRouter = require('./battalion');

const router = express.Router();

router.get('/company', isLoggedIn, CompanyRouter);
router.get('/battalion', isLoggedIn, BattalionRouter);

<<<<<<< HEAD
=======
// 마편 READ

>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
module.exports = router;