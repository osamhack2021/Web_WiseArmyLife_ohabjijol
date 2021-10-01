"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { User, Post, Comment, Forum } = require('../../models');
const PostRouter = require('../community/post');

const router = express.Router();


router.get('/:pageIndex', isLoggedIn, async (req, res, next) => {
    try {
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
        if (postCount === 0) {
            res.json({ sucess: false }); // 비어있을 경우
        } else {
            const letterForum = await Forum.findOne({ where: { forumName: '마음의 편지' } });
            const post_10 = await Post.findAndCountAll({
                where: { ForumId: letterForum.id },
                limit: limit,
                order: [['createdAt', 'DESC']],
                skip: skip,
                attributes: ['updatedAt', 'commentCount'],
            });
            const data = {
                post_10: post_10,
                postCount: postCount,
            }
            return res.json({ sucess: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 마편 READ
router.use('/post', isLoggedIn, PostRouter);

module.exports = router;