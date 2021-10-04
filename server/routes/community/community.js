"use strict";

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { isExecutive } = require('../user/check_is_executive');
const { Post, User, Forum } = require('../../models');
const ForumRouter = require('./forum');


const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const allForum = await Forum.findAndCountAll({
            include: [{
                model: Post,
                limit: 1,
                order: [['createdAt', 'DESC']],
            }],
            order: [['forumName', 'DESC']],
        });
        const data = {
            allForum: allForum,
        }
        return res.json({ success: true, data });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.route('/forumAdd')
    .post(isLoggedIn, isExecutive, async (req, res) => {
        try {
            const newForumName = req.body.forumName
            const exForum = await Forum.findOne({ where: { forumName: newForumName } })
            if (exForum) {
                const data = {
                    message: '같은 이름의 게시판이 존재합니다',
                }
                return res.json({ sucess: false, data });
            }
            else {
                await Forum.create({
                    forumName: newForumName,
                });
                return res.json({ sucess: true, data: null });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .get(isLoggedIn, isExecutive, (req, res) => {
        return res.json({ sucess: true, data: null });
    });
router.delete('/:forumId', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const currentForumId = req.params.forumId;
        const currentForum = await Forum.findOne({ where: { id: currentForumId } });
        if (currentForum) {
            await Post.findAll({ attributes: ['postId'], where: { ForumId: currentForumId } })
                .then(postId => {
                    if (postId.length == 0) {
                        return res.json({ sucess: true, data: null });
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
                    res.json({ sucess: true, data: null });
                })
                .catch(error => {
                    console.error(error);
                    next(error);
                });
        }
        else {
            const data = {
                message: '없는 게시판 입니다.',
            }
            return res.json({ sucess: false, data });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 게시판 CRUD

router.get('/:forumId', isLoggedIn, ForumRouter);


module.exports = router;