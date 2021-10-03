"use strict"

const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        question: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        answer: {
            type: Sequelize.STRING(50),
        },
      }, {
        sequelize,
        timestamps: false,
        paranoid: false, // deletedAt컬럼
        modelName: 'Question',
        tableName: 'questions',
        comment: 'Question',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
    }
  };