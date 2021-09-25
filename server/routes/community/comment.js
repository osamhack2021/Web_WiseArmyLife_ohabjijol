"use strict"

const express = require('express');

const { Post, User } = require('../../models');
const { isLoggedIn } = require('../user/check_login');

const router = express.Router();
// post로 넘겨 받을 것
router.route('/')
    .post(isLoggedIn, checkPostId, async (req, res, next) => {
        try{
        const currentPost = res.locals.post; // postId는 url로 받아옴
        req.body.commenter = req.user.name;
        req.body.postComment = currentPost.postId;
        const post = await Post.create({
            content: req.body.content,
            commenter: req.user.name,
            postComment: currentPost.postId,
        });
        res.json({ sucess: true });
        } catch (err){
            console.error(err);
            next(err);
        }

    })
    .put(isLoggedIn, async (req, res, next) => {
        try{
            
            } catch (err){
                console.error(err);
                next(err);
            }
    })
    .delete(isLoggedIn, async (req, res, next) => {
        try{
            
            } catch (err){
                console.error(err);
                next(err);
            }
    });
    
    router.post('/:commentId', checkPostId, isLoggedIn, async (req, res, next) => {
        try{
            const currentPost = res.locals.post; // postId는 url로 받아옴
            req.body.commenter = req.user.name;
            req.body.postComment = currentPost.postId;
            const post = await Post.create({
                content: req.body.content,
                commenter: req.user.name,
                postComment: currentPost.postId,
                parentCommentId: req.query.commentId,
            });
            res.json({ sucess: true });
            } catch (err){
                console.error(err);
                next(err);
            }
        }
    ); // 대댓글



// 현재 PostID가 있는 지 확인
function checkPostId(req, res, next){
    Post.findOne( {where: { id:req.query.postId }})
        .then(post => {
            res.locals.post = post;
            next();
        }) 
        .catch(err => {
            return res.json(err);        
        })
        
}

module.exports = router;
