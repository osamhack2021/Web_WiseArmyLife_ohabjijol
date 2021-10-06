'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');
const Post = require('./community/post');
const Shooting = require('./assessment/shooting');
const Forum = require('./community/forum');
const Comment = require('./community/comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);


db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Shooting = Shooting;
db.Forum = Forum;
db.Comment = Comment;


const ShootingEvent = sequelize.define('ShootingEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
db.ShootingEvent = ShootingEvent;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Shooting.init(sequelize);
Forum.init(sequelize);


User.associate(db);
Post.associate(db);
Comment.associate(db);
Shooting.associate(db);
Forum.associate(db);




module.exports = db;