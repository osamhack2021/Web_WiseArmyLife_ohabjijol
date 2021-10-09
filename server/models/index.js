'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');
const Post = require('./community/post');
const Shooting = require('./assessment/shooting');
const MentalForce = require('./assessment/mentalForce');
const Cbr = require('./assessment/cbr');
const FirstAid = require('./assessment/firstAid');
const IndividualBattle = require('./assessment/individualBattle');

const Forum = require('./community/forum');
const Comment = require('./community/comment');
const Question = require('./assessment/question');

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

db.IndividualBattle = IndividualBattle;
db.Cbr = Cbr;
db.FirstAid = FirstAid;
db.MentalForce = MentalForce;
db.Question = Question;


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
FirstAid.init(sequelize);
Cbr.init(sequelize);
MentalForce.init(sequelize);
Question.init(sequelize);
IndividualBattle.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Shooting.associate(db);
Forum.associate(db);
FirstAid.associate(db);
Cbr.associate(db);
MentalForce.associate(db);
Question.associate(db);
IndividualBattle.associate(db);




module.exports = db;