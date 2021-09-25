"use strict";

const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const { Post, User, Forum } = require('../../models');
const ForumRouter = require('./forum');
const PostRouter = require('./post');


const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const forumLimit = 10;
        const allForum = await Forum.findAndCountAll({
            include: [{
               model: Post,
               limit: 1,
               order: [['createdAt', 'DESC']],
            }],
            order: [['forumName', 'DESC']],
            limit: forumLimit,
        });
        res.json(allForum);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/:forumId', isLoggedIn, ForumRouter);




module.exports = router;