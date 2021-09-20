"use strict"

const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      }, {
        sequelize,
        timestamp: true,
        paranoid: true,
        modelName: 'Comment',
        tableName: 'comments',
        comment: 'Comment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
        db.Comment.belongsTo(db.Post, { foreignKey: 'postcomment', targetKey: 'id' });
    }
  };