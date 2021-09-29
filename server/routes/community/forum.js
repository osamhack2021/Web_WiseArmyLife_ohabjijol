"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { User, Post, Comment } = require('../../models');
const PostRouter = require('./post');

const router = express.Router();


router.get('/:forumId/post', isLoggedIn, PostRouter);
router.get('/:forumId/:pageIndex', isLoggedIn, async (req, res) => {
    try {
        const forumId = req.params.forumId;
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
        const post_10 = await Post.findAndCountAll({
            where: { forumId: forumId },
            include: [{
                model: User,
                attributes: ['id', 'militaryNumber', 'name'],
            },
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
            skip: skip,
        });
        res.json({sucess: true, data: post_10, postCount: postCount});
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 특정 게시판 읽기

module.exports = router;