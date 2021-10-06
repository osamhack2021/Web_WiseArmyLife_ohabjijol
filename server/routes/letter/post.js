"use strict"
// 아직 만드는중 
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const CommentRouter = require('./comment');

const { isLoggedIn } = require('../user/check_login');
const { User, Post } = require('../../models');

const router = express.Router();
const dir = ('./uploadFiles');

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploadFiles/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { filesize: 5 * 1024 * 1024 },
});

router.post('/upload', isLoggedIn, upload.single('image'), (req, res) => {
    console.log(req, file);
    res.json({ url: '/img/${req.file.filename}' });
});

const upload2 = multer();
router.route('/')
    .post(isLoggedIn, upload2.none(), async (req, res, next) => {
        try {
            const post = await Post.create({
                title: req.body.title,
                content: req.body.content,
                img: req.body.url,
                UserId: req.user.id,
                ForumId: req.query.forumId,
            });
            res.json({ sucess: true, data: post });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

router.route('/:postId')
    .get(isLoggedIn, async (req, res, next) => {
        try {
            const currentPostId = req.params.postId;
            const currentPost = await Post.findOne({
                where: { id: currentPostId },
                include: [{
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment', 'createdAt'],
                    include: [{
                        model: User,
                        attributes: ['name'],
                    }],
                },
                ],
            });
                res.json({sucess: true, data:currentPost }); // parentId.deletedAt 컬럼에 값 존재 시 삭제된 메세지 뜨게 할 것
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(isLoggedIn, async (req, res, next) => {
        try {
            let currentPostId = req.params.postId;
            let currentPost = await Post.findOne({ where: { id: currentPostId } });
            if (currentPost.UserId === req.user.id) {
                Post.destroy({ where: { id: currentPostId } })
                Comment.destroy({ where: { postComment: currentPostId } })
                    .then(result => {
                        console.log('게시글 댓글 삭제 성공')
                        return res.json({sucess: true});
                    })
                    .catch(error => {
                        console.error(error);
                        next(error);
                    })
            }
            else {
                console.log('게시글 삭제실패');
                const data = {
                    message: '게시글 삭제실패',
                }
                return res.json({ sucess: false, data });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    })// 게시글 삭제
    .put(isLoggedIn, async (req, res, next) => {
        try {
            let currentPostId = req.params.postId;
            const postBody = req.body;
            let currentPost = await Post.findOne({ where: { id: currentPostId } })
            if (currentPost.UserId === req.user.id) {
                await Post.update({
                    title: postBody.title,
                    content: postBody.content,
                    updatedAt: new Date(),
                }, {
                    where: { id: currentPostId }
                })
                    .then(result => {
                        console.log('수정 성공');
                        res.json({ sucess: true });
                    })
                    .catch(err => {
                        console.error(err);
                        next(error);
                    })
            }
            else {
                console.log('수정 실패');
                const data = {
                    message: '없는 게시글 입니다',
                }
                return res.json({ sucess: false, data });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    });// 게시글 수정

router.post('/:postId/comment', CommentRouter);
router.use('/:postId/:commentId', CommentRouter);

module.exports = router;