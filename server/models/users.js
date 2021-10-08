'use strict';

const { STRING, BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      militaryNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      password: {
        type: STRING(100),
        allowNull: false,
      },
      unit: {
        type: STRING(100),
        allowNull: true,
      },
      executive: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      paranoid: false,
      modelName: 'User',
      tableName: 'users',
      comment: 'User',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {

    db.User.hasMany(db.Post, { foreignKey: 'posterId', sourceKey: 'id' });
    db.User.hasMany(db.Comment, { foreignKey: 'commenterId', sourceKey: 'id' });
    db.User.belongsToMany(db.Shooting , {through : db.ShootingEvent});
    db.User.belongsToMany(db.MentalForce, {through : db.MentalForceEvent});

  }
};