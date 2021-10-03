"use strict"

const express = require('express');

const { isLoggedIn, isExecutive } = require('../user/check_login');
const { User, Post, Comment } = require('../../models');
const PostRouter = require('./post');

const router = express.Router();


router.get('/post', isLoggedIn, PostRouter);
router.get('/:pageIndex', isLoggedIn, async (req, res) => {
    try {
        res.locals.forumId = req.params.forumId;
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
<<<<<<< HEAD
        const maxPage = ceil(postCount / limit);
        if (postCount === 0) {
            return res.json({ sucess: false, data: null }); // 작성된 글이 없을 경우
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
            res.json({ sucess: true }, data);
        }
=======
        const maxPage = ceil(postCount/limit);
        if(postCount === 0){
            return res.json({sucess: false}); // 작성된 글이 없을 경우
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
        res.json({sucess: true, data});
    }
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 특정 게시판 읽기

module.exports = router;