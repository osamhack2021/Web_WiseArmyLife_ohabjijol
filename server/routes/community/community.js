"use strict";

const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const { Post, User } = require('../../models');
const PostRouter = require('./post');
const CommentRouter = require('./comment');

const router = express.Router();

router.get('/post', isLoggedIn, PostRouter);
router.get('/comment', isLoggedIn, CommentRouter);
router.get('/:pageIndex', isLoggedIn, async (req, res) => {
    try {
        let page = Math.max(1, parseInt(req.query.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let count = await Post.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        const post_10 = await Post.findAll({
            include: {
                model: User,
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