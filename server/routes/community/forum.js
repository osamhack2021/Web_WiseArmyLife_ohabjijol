"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { User, Post, Comment } = require('../../models');
const PostRouter = require('./post');

const router = express.Router();
router.use('/post', isLoggedIn, PostRouter);
router.get('/:pageIndex', isLoggedIn, async (req, res) => {
    try {
        console.log('포럼 들어와짐');
        let page = Math.max(1, parseInt(res.locals.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.count({where: {ForumId: res.locals.forumId}});
        const maxPage = Math.ceil(postCount/limit);
        if(postCount === 0){
            return res.json({success: true, data: null}); // 작성된 글이 없을 경우
        } else {
        const post_10 = await Post.findAndCountAll({
            where: { forumId: res.locals.forumId },
            include: [{
                model: User,
                attributes: ['id', 'militaryNumber', 'name'],
            },
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
            skip: skip,
        });
        const data = {
            post_10: post_10,
            maxPage: maxPage,
        }
        res.json({success: true, data });
    }
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 특정 게시판 읽기


module.exports = router;