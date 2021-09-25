"use strict"

const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      }, {
        sequelize,
        timestamp: false,
        paranoid: true, // deletedAt컬럼
        modelName: 'Comment',
        tableName: 'comments',
        comment: 'Comment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
        db.Comment.belongsTo(db.Post, { foreignKey: 'postComment', targetKey: 'id' });
        db.Comment.hasMany(db.Comment, { foreignKey: 'parentCommentId', souuceKey: 'id' });
        db.Comment.belongsTo(db.Comment, { foreignKey: 'parentCommentId', targetKey: 'id' });
    }
  };