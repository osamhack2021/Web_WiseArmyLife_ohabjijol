'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');
const Post = require('./community/post');
const Shooting = require('./assessment/shooting');
const MentalForce = require('./assessment/mentalForce');

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
db.MentalForce = MentalForce;

const ShootingEvent = sequelize.define('ShootingEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const MentalForceEvent = sequelize.define('MentalForceEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const ExamEvent = sequelize.define('ExamEvent', {}, { timestamps: false });



db.ShootingEvent = ShootingEvent;
db.MentalForceEvent = MentalForceEvent;
db.ExamEvent = ExamEvent;


User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Shooting.init(sequelize);
Forum.init(sequelize);
MentalForce.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Shooting.associate(db);
Forum.associate(db);
MentalForce.associate(db);




module.exports = db;