"use strict"

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn } = require('../user/check_login');
const { Post, User } = require('../../models');

const router = express.Router();
const dir = ('./uploadFiles');

if(!fs.existsSync(dir)) fs.mkdirSync(dir);

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploadFiles/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {filesize: 5 * 1024 * 1024 },
});

router.post('/upload', isLoggedIn, upload.single('image'), (req, res) => {
    console.log(req,file);
    res.json({ url: '/img/${req.file.filename}'});
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
    res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postid/delete', isLoggedIn, async (req, res, next) => {
    let currentPostID = req.params.postid;
    let currentPost = await Post.findOne({where: { id: currentPostID }})
    if (currentPost.UserId === req.user.id)
        await Post.destroy({ where: {id: currentPostID }})
            .then( result => {
                console.log('삭제성공');
                res.json({sucess: true});
            })
            .catch(err => {
                console.error(err);
                next(error);
            })
    else {
        console.log('삭제실패');
        return res.json({sucess: false})
    }
})
// 게시글 삭제

router.put('/:postid/update', isLoggedIn, async (req, res, next) => {
    let currentPostID = req.params.postid;
    const postBody = req.body;
    let currentPost = await Post.findOne({where: { id: currentPostID }})
    if (currentPost.UserId === req.user.id)
        await Post.update({
            title: postBody.title,
            content: postBody.content,
            updatedAt: postBody.updatedAt,
            },{
                where: {id: currentPostID }
            })
            .then( result => {
                console.log('수정 성공');
                res.json({sucess: true});
            })
            .catch(err => {
                console.error(err);
                next(error);
            })
    else {
        console.log('수정 실패')
        return res.json({sucess: false})
    }
});
// 게시글 수정

module.exports = router;