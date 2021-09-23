"use strict"

const Sequelize = require('sequelize');

module.exports = class Forum extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: false,
        paranoid: false,
        modelName: 'Forum',
        tableName: 'Forums',
        comment: 'Forum',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Forum.hasMany(db.Post, { sourceKey: 'id' });
    }
  };