"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { isNotExecutive } = require('../user/check_is_executive');
const { Post, Forum } = require('../../models');
const PostRouter = require('../community/post');

const router = express.Router();


router.get('/:pageIndex', isLoggedIn, checkCompanyCommander, async (req, res, next) => {
    try {
        const letterForumId = 1;
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.count({ where: { ForumId: letterForumId } })
            
                const maxPage = Math.ceil(postCount / limit);
                const post_10 = await Post.findAndCountAll({
                    where: { ForumId: letterForumId, posterId: req.user.id },
                    limit: limit,
                    order: [['createdAt', 'DESC']],
                    offset: skip,
                });
                const data = {
                    post_10: post_10,
                    maxPage: maxPage,
                }
                return res.json({ success: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
            
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/:pageIndex', isLoggedIn, isNotExecutive, async (req, res, next) => {
    try {
        const letterForumId = 1;
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.count({ where: { ForumId: letterForumId } })
            
                const maxPage = Math.ceil(postCount / limit);
                const post_10 = await Post.findAndCountAll({
                    where: { ForumId: letterForumId, posterId: req.user.id },
                    limit: limit,
                    order: [['createdAt', 'DESC']],
                    offset: skip,
                });
                const data = {
                    post_10: post_10,
                    maxPage: maxPage,
                }
                return res.json({ success: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
            
            
    } catch (error) {
        console.error(error);
        next(error);
    }
});

function checkCompanyCommander(req, res, next) {
    try {
        if (req.user.executive === 2) {
            next();
        }
        else {
            next('route');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

router.use('/post', isLoggedIn, async (req, res, next) => {
    try {


        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            posterId: req.user.id,
            ForumId: 1
        });
        const data = {
            post: post,
        }
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;