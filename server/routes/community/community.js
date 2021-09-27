"use strict";

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { isExecutive } = require('../user/check_is_executive');
const { Post, User, Forum } = require('../../models');
const ForumRouter = require('./forum');


const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: 1 } });
        const posts = await user.getPosts();
        console.log(posts);
        const forumLimit = 10;
        const allForum = await Forum.findAndCountAll({
            include: [{
                model: Post,
                limit: 1,
                order: [['createdAt', 'DESC']],
            }],
            order: [['forumName', 'DESC']],
            limit: forumLimit,
        });
        res.json(allForum);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
// 게시판 읽기
router.route('/forumAdd')
    .post(isLoggedIn, isExecutive, async (req, res, next) => {
        try {
            const newForumName = req.body.forumName
            const exForum = Forum.findOne({ where: { forumName: newForumName } })
            if (exForum) {
                res.json({ sucess: false, message: '같은 이름의 게시판이 존재합니다' });
            }
            else {
                await Forum.create({
                    forumName: newForumName,
                });
                res.json({ sucess: true });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .get(isLoggedIn, isExecutive, (req, res, next) => {
        res.json({ sucess: true });
    });
// 게시판 추가

router.delete('/:forumId', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const currentForumId = req.params.forumId;
        const currentForum = await Forum.findOne({ where: { id: currentForumId } });
        if (currentForum) {
            await Post.findAll({ attributes: ['postId'], where: { ForumId: currentForumId } })
                .then(postId => {
                    if (postId.length == 0) {
                        return res.json({ sucess: true });
                    }
                    return Comment.destroy({ where: { PostId: postId } });
                })
                .catch(err => {
                    console.error(err);
                    next(error);
                });
            Post.destroy({ where: { ForumId: currentForumId } });
            Forum.destroy({ where: { id: currentForumId } })
                .then(result => {
                    console.log('삭제 성공');
                    res.json({ sucess: true });
                })
                .catch(error => {
                    console.error(error);
                    next(error);
                });
        }
        else {
            res.json({ sucess: false, message: '없는 게시판 입니다.' });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 게시판 삭제

router.get('/:forumId', isLoggedIn, ForumRouter);


module.exports = router;