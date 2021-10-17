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
        commentCount: {
          type: Sequelize.INTEGER,
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
        timestamps: true,
        paranoid: false,
        modelName: 'Post',
        tableName: 'posts',
        comment: 'Post',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'posterId', targetKey: 'id' });
        db.Post.belongsTo(db.Forum, { targetKey: 'id' });
        db.Post.hasMany(db.Comment, { foreignKey: 'postComment', targetKey: 'id' });
    }
  };