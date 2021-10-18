"use strict";

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { isExecutive } = require('../user/check_is_executive');
const { Post, Forum ,Comment} = require('../../models');
const ForumRouter = require('./forum');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const allForum = await Forum.findAndCountAll({
            where: { id: { [Op.gte]: 3 } },
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
        console.log(data.allForum.rows);
        res.json({ success: true, data });
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
                return res.json({ success: false, data });
            }
            else {
                console.log('만들어짐');
                await Forum.create({
                    forumName: newForumName,
                });
                return res.json({ success: true, data: null });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .get(isLoggedIn, isExecutive, (req, res) => {
        return res.json({ success: true, data: null });
    });




router.delete('/:forumId', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const currentForumId = req.params.forumId;
        const currentForum = await Forum.findOne({ where: { id: currentForumId } });
        if (currentForum) {
            const postId = await Post.findAll({ attributes: ['posterId'], where: { ForumId: currentForumId } })

            if (postId.length == 0) {
                Forum.destroy({ where: { id: currentForumId } })
                console.log('삭제 성공');

                return res.json({ success: true, data: null });
            }
            Promise.all([Comment.destroy({ where: { postComment: postId } }), Post.destroy({ where: { ForumId: currentForumId } }), Forum.destroy({ where: { id: currentForumId } })])
            console.log('삭제 성공');
            res.json({ success: true, data: null });

        }
        else {
            const data = {
                message: '없는 게시판 입니다.',
            }
            return res.json({ success: false, data });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.put('/:forumId', isLoggedIn, isExecutive, async (req, res, next) => {
    try {
        const currentForumId = req.params.forumId;
        const currentForum = await Forum.findOne({ where: { id: currentForumId } });
        if (currentForum) {
            await Forum.updata({ forumName: req.body.forumName }, { where: { id: currentForumId } });
            return res.json({ success: true, data: null });
        }
        else {
            const data = {
                message: '없는 게시판 입니다.',
            }
            return res.json({ success: false, data });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 게시판 CRUD
router.use('/:forumId', isLoggedIn, storeForumId, ForumRouter);

function storeForumId(req, res, next) {
    res.locals.forumId = req.params.forumId;
    console.log('포럼아이디저장');
    next();
}

module.exports = router;