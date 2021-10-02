"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { User, Post, Comment, Forum } = require('../../models');
const PostRouter = require('../community/post');
const { isNotExecutive, isExecutive } = require('../user/check_is_executive');

const router = express.Router();


router.get('/:pageIndex', isNotExecutive, isLoggedIn, async (req, res, next) => {
    try {
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
        const maxPage = ceil(postCount/limit);
        if (postCount === 0) {
            res.json({ sucess: false }); // 비어있을 경우
        } else {
            const letterForumId = await Forum.findOne({ where: { forumName: '대대 마음의 편지' }, attributes: ['id'], });
            const post_10 = await Post.findAndCountAll({
                where: { ForumId: letterForumId, poster: req.user.id },
                limit: limit,
                order: [['createdAt', 'DESC']],
                skip: skip,
            });
            const data = {
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/:pageIndex', checkBattalionCommander, isLoggedIn, async (req, res, next) => {
    try {
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
        const maxPage = ceil(postCount/limit);
        if (postCount === 0) {
            res.json({ sucess: false }); // 비어있을 경우
        } else {
            const letterForumId = await Forum.findOne({ where: { forumName: '대대 마음의 편지' }, attributes: ['id'], });
            const post_10 = await Post.findAndCountAll({
                where: { ForumId: letterForumId, poster: req.user.id },
                limit: limit,
                order: [['createdAt', 'DESC']],
                skip: skip,
            });
            const data = {
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

function checkBattalionCommander (req, res, next) {
    try{
        if(req.user.executive === 3){
        next();
        }
        else {
            const data = {
                message: 'no right to access'
            }
            return res.json({sucess: false}, data);
        }

    } catch(error) {
        console.error(error);
        next(error);
    }
}

router.use('/post', isLoggedIn, PostRouter);

module.exports = router;