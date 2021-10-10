'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');
const Post = require('./community/post');
const Shooting = require('./assessment/shooting');
const MentalForce = require('./assessment/mentalForce');
const FirstAid = require('./assessment/firstAid');
const CBR = require('./assessment/cBR');
const Speciality = require('./assessment/speciality');
const Strength = require('./assessment/strength');
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
db.FirstAid = FirstAid;
db.CBR = CBR;
db.Speciality = Speciality;
db.Strength = Strength;
db.IndividualBattle = IndividualBattle;



db.MentalForce = MentalForce;
db.Question = Question;


const ShootingEvent = sequelize.define('ShootingEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const MentalForceEvent = sequelize.define('MentalForceEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},type : {type : DataTypes.INTEGER}}, { timestamps: false });
const FirstAidEvent =  sequelize.define('FirstAidEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const CBREvent =  sequelize.define('CBREvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const SpecialityEvent =  sequelize.define('SpecialityEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const StrengthEvent =  sequelize.define('StrengthEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });
const IndividualBattleEvent =  sequelize.define('IndividualBattleEvent', {score: {type : DataTypes.INTEGER,defaultValue : -1},}, { timestamps: false });


const ExamEvent = sequelize.define('ExamEvent', {type : {type : DataTypes.INTEGER}, orderQ : {type : DataTypes.INTEGER,}}, { timestamps: false });


db.FirstAidEvent = FirstAidEvent;
db.CBREvent = CBREvent;
db.SpecialityEvent = SpecialityEvent;
db.StrengthEvent = StrengthEvent;
db.IndividualBattleEvent = IndividualBattleEvent;

db.ShootingEvent = ShootingEvent;
db.MentalForceEvent = MentalForceEvent;
db.ExamEvent = ExamEvent;


User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Shooting.init(sequelize);
Forum.init(sequelize);
MentalForce.init(sequelize);
FirstAid.init(sequelize);
CBR.init(sequelize);
Speciality.init(sequelize);
Strength.init(sequelize);
IndividualBattle.init(sequelize);


Question.init(sequelize);


User.associate(db);
Post.associate(db);
Comment.associate(db);
Shooting.associate(db);
Forum.associate(db);
FirstAid.associate(db);
CBR.associate(db);
Speciality.associate(db);
Strength.associate(db);
IndividualBattle.associate(db);


MentalForce.associate(db);
Question.associate(db);




module.exports = db;