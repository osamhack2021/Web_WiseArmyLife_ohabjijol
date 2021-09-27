"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { User } = require('../../models');

const router = express.Router();

router.get('/:forumId/post', isLoggedIn, PostRouter);
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