"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
<<<<<<< HEAD
const { Post, Forum } = require('../../models');
const PostRouter = require('../community/post');
const { isNotExecutive } = require('../user/check_is_executive');
=======
const { User, Post, Comment, Forum } = require('../../models');
const PostRouter = require('../community/post');
const { isNotExecutive, isExecutive } = require('../user/check_is_executive');
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a

const router = express.Router();


router.get('/:pageIndex', isNotExecutive, isLoggedIn, async (req, res, next) => {
    try {
<<<<<<< HEAD
        const letterForumId = await Forum.findOne({ where: { forumName: '대대 마음의 편지' }, attributes: ['id'], });
=======
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
<<<<<<< HEAD
        const maxPage = ceil(postCount / limit);
        if (postCount === 0) {
            const data = {
                forumId: letterForumId,
            }
            res.json({ sucess: false }, data); // 비어있을 경우
        } else {
=======
        const maxPage = ceil(postCount/limit);
        if (postCount === 0) {
            res.json({ sucess: false }); // 비어있을 경우
        } else {
            const letterForumId = await Forum.findOne({ where: { forumName: '대대 마음의 편지' }, attributes: ['id'], });
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
            const post_10 = await Post.findAndCountAll({
                where: { ForumId: letterForumId, poster: req.user.id },
                limit: limit,
                order: [['createdAt', 'DESC']],
                skip: skip,
            });
            const data = {
<<<<<<< HEAD
                forumId: letterForumId,
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true}, data); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
=======
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/:pageIndex', checkBattalionCommander, isLoggedIn, async (req, res, next) => {
    try {
<<<<<<< HEAD
        const letterForumId = await Forum.findOne({ where: { forumName: '중대대 마음의 편지' }, attributes: ['id'], });
=======
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        let page = Math.max(1, parseInt(req.params.pageIndex));
        const limit = 10;
        let skip = (page - 1) * limit;
        let postCount = await Post.countDocuments({});
<<<<<<< HEAD
        const maxPage = ceil(postCount / limit);
        if (postCount === 0) {
            const data = {
                forumId: letterForumId,
            }
            res.json({ sucess: false }, data); // 비어있을 경우
        } else {
=======
        const maxPage = ceil(postCount/limit);
        if (postCount === 0) {
            res.json({ sucess: false }); // 비어있을 경우
        } else {
            const letterForumId = await Forum.findOne({ where: { forumName: '대대 마음의 편지' }, attributes: ['id'], });
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
            const post_10 = await Post.findAndCountAll({
                where: { ForumId: letterForumId, poster: req.user.id },
                limit: limit,
                order: [['createdAt', 'DESC']],
                skip: skip,
            });
            const data = {
<<<<<<< HEAD
                forumId: letterForumId,
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true}, data); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
=======
                post_10: post_10,
                maxPage: maxPage,
            }
            return res.json({ sucess: true, data }); // post_10.count에는 post개수, .rows에는 post의 정보가 들어있음
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

<<<<<<< HEAD
function checkBattalionCommander(req, res, next) {
    try {
        if (req.user.executive === 3) {
            next();
=======
function checkBattalionCommander (req, res, next) {
    try{
        if(req.user.executive === 3){
        next();
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        }
        else {
            const data = {
                message: 'no right to access'
            }
<<<<<<< HEAD
            return res.json({ sucess: false }, data);
        }
    } catch (error) {
=======
            return res.json({sucess: false}, data);
        }

    } catch(error) {
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
        console.error(error);
        next(error);
    }
}

<<<<<<< HEAD
router.use('/:forumId/post', isLoggedIn, PostRouter);
=======
router.use('/post', isLoggedIn, PostRouter);
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a

module.exports = router;