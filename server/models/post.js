"use strict"

const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
      return super.init({
        content: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        img: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
      }, {
        sequelize,
        timestamp: true,
        paranoid: true,
        modelName: 'Post',
        tableName: 'posts',
        comment: 'Post',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'poster', targetKey: 'id' });
    }
  };