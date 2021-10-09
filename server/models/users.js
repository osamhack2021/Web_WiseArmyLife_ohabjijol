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
      joinArmyDay: {
        type: Sequelize.DATE,
        allowNull: true,
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
<<<<<<< HEAD
=======
    db.User.belongsToMany(db.FirstAid, {through : db.FirstAidEvent});
    db.User.belongsToMany(db.CBR, {through : db.CBREvent});
    db.User.belongsToMany(db.Speciality, {through : db.SpecialityEvent});
    db.User.belongsToMany(db.IndividualBattle, {through : db.IndividualBattleEvent});
     
>>>>>>> 43224d935be73994ec3e5e9cccbfa5fad7c00274

  }
};