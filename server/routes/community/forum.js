"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
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
        let maxPage = Math.ceil(postCount/limit);
        const post_10 = await Post.findAll({
            where: { forumId: forumId },
            include: [{
                model: User,
                as: 'posterId',
                attributes: ['id', 'militaryNumber', 'name'],
            },
            {
                model: Comment,
                attributes: [[sequelize.fn('COUNT', sequelize.col(''))]]
            },
            ],
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