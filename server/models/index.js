'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');
const Post = require('./post');
const Shooting = require('./assessment/shooting');

const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);


db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Shooting = Shooting;

db.Comment = Comment;


db.ShootingEvent = sequelize.define('ShootingEvent', {score: DataTypes.INTEGER,}, { timestamps: false });


User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Shooting.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Shooting.associate(db);




module.exports = db;