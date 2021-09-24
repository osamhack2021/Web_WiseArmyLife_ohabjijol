"use strict"

const express = require('express');

const { Post, User } = require('../../models');
const { isLoggedIn } = require('../user/check_login');

const router = express.Router();
// post로 넘겨 받을 것
router.post('/', isLoggedIn, checkPostId, async(req, res, next) => {
    const currentPost = res.locals.post; // postId는 url로 받아옴
    req.body.commenter = req.user.name;
    req.body.postComment = currentPost.postId;
    // 내일 마저 할 곳

});














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
