"use strict";

const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../user/check_login');
const { Post, User } = require('../../models');
const PostRouter = require('./post');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        let page = Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let skip = (page - 1) * limit;
        let count = await Post.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        const post_10 = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'militaryNumber', 'name'],
            },
            order: [['createdAt', 'DESC']],
            limit: limit,
            skip: skip,
        });
        res.render('posts/index', {
            posts: post_10,
            currentPage: page,
            maxPage: maxPage,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
},);



router.get('/post', isLoggedIn, PostRouter);