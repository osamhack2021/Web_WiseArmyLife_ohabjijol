"use strict"

const express = require('express');

const { Post, User } = require('../../models');
const { isLoggedIn } = require('../user/check_login');

const router = express.Router();
// post로 넘겨 받을 것
router.route('/')
    .post(checkPostId, isLoggedIn, checkPostId, async (req, res, next) => {
        try {
            const currentPost = res.locals.post; // postId는 url로 받아옴
            req.body.commenterId = req.user.id;
            req.body.postComment = currentPost.postId;
            const comment = await Comment.create({
                content: req.body.content,
                commenterId: req.user.id,
                postComment: currentPost.postId,
            });
            currentPost.commentCount++;
            const data = {
                comment: comment,
            }
            res.json({ sucess: true }, data);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });
router.route('/:commentId')
    .put(checkPostId, isLoggedIn, async (req, res, next) => {
        try {
            const currentPost = res.locals.post;
            const currentCommentId = req.params.commentId;
            const commentBody = req.body;
            if (currentPost.UserId === req.user.id)
                await Comment.update({
                    comment: commentBody.comment,
                    updatedAt: new Date(),
                }, {
                    where: { id: currentCommentId }
                })
                    .then(result => {
                        console.log('수정 성공');
                        const data = {
                            message: '수정 성공',
                        }
                        return res.json({ sucess: true }, data);
                    })
                    .catch(err => {
                        console.error(err);
                        next(error);
                    })
            else {
                console.log('수정 실패')
                const data = {
                    message: '작성자가 아닙니다',
                }
                return res.json({ sucess: false }, data);
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(checkPostId, isLoggedIn, async (req, res, next) => {
        try {
            const currentPost = res.locals.post;
            const currentCommentId = req.params.commentId;
            const currentComment = await Comment.findOne({ where: { id: currentCommentId } });
            if (currentComment.UserId === req.user.id) {
                await Comment.destroy({ where: { id: currentCommentId } })
                    .then(result => {
                        console.log('삭제성공');
                        currentPost.commentCount--;
                        res.json({ sucess: true, data: null });
                    })
                    .catch(err => {
                        console.error(err);
                        next(error);
                    })
            }
            else {
                console.log('삭제실패');
                return res.json({ sucess: false, data: null })
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(checkPostId, isLoggedIn, async (req, res, next) => {
        try {
            const currentPost = res.locals.post;
            const currentCommentId = req.params.commentId;
            req.body.commenterId = req.user.id;
            req.body.postComment = currentPost.postId;
            const comment = await Comment.create({
                content: req.body.content,
                commenterId: req.user.id,
                postComment: currentPost.postId,
                parentComment: currentCommentId,
            });
            currentPost.commentCount++;
            const data = {
                comment: comment,
            }
            res.json({ sucess: true }, data);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    ); // 대댓글
// 댓글 CRUD

// 현재 PostID가 있는 지 확인
function checkPostId(req, res, next) {
    Post.findOne({ where: { id: req.params.postId } })
        .then(post => {
            res.locals.post = post;
            next();
        })
        .catch(err => {
            return res.json(err);
        })
}

module.exports = router;
 