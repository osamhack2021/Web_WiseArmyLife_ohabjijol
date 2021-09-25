"use strict";

const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const { Post, User, Forum } = require('../../models');
const PostRouter = require('./post');
const CommentRouter = require('./comment');

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
router.get('/:forumId/post', isLoggedIn, PostRouter);
router.get('/:forumId/:postId/comment', isLoggedIn, CommentRouter);
router.get('/:forumId/:pageIndex', isLoggedIn, async (req, res) => {
    try {
        const forumId = req.query.forumId;
        let page = Math.max(1, parseInt(req.query.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let count = await Post.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        const post_10 = await Post.findAll({
            where: { forumId: forumId },
            include: {
                model: User,
                as: 'poster',
                attributes: ['id', 'militaryNumber', 'name'],
            },
            order: [['createdAt', 'DESC']],
            limit: limit,
            skip: skip,
        });
        const data = {
            posts: post_10,
            currentPage: page,
            maxPage: maxPage,
        }
        res.send(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;