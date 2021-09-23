"use strict"

const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        img: {
            type: Sequelize.STRING(200),
            allowNull: true,
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
        timestamp: true,
        paranoid: false,
        modelName: 'Post',
        tableName: 'posts',
        comment: 'Post',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'poster', targetKey: 'id' });
        db.Post.belongsTo(db.Forum, { targetKey: 'id' });
    }
  };