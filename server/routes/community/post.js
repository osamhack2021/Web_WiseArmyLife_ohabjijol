"use strict"

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Post = require('../../models/post');
const { isLoggedIn } = require('../user/check_login');

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


// 게시글 삭제하기 해야됨

module.exports = router;