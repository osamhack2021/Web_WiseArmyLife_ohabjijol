'use strict';

const { STRING, BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false,
      },
      militaryNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(100),
        allowNull: false,
      },
      unit: {
        type: STRING(100),
        allowNull: false,
      },
      isExecutive: {
        type: BOOLEAN,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamp: true,
      paranoid: true,
      tableName: 'users',
      comment: 'User',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      freezeTableName: false,
    });
  }
  static associate(db) {}
};