"use strict"

const express = require('express');

const { isLoggedIn } = require('../user/check_login');
const { isNotExecutive } = require('../user/check_is_executive');
const { Post, Forum } = require('../../models');
const PostRouter = require('../community/post');

const router = express.Router();


