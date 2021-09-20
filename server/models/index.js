'use strict';

// db와 연동
const Sequelize = require('sequelize');
const User = require('./users');
const Post = require('./post');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);

module.exports = db;