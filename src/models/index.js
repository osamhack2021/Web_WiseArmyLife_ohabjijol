'use strict';

// db와 연동
const Sequelize = require('sequelize');
const User = require('./UserStorage');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
db.sequelize = sequelize;

module.exports = db;