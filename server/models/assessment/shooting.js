"use strict"

const Sequelize = require('sequelize');

module.exports = class Shooting extends Sequelize.Model {
    static init(sequelize){
      return super.init({
       
        date : {
            type : Sequelize.DATEONLY,
            allowNull : false,
            unique : true,
        },
        expired : {
            type : Sequelize.ENUM('Full','Applying','Expired'),
            allowNull : false,
            defaultValue : 'Applying',
        },
        applicant_capacity : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        number_of_applicant : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue : 0,

        },        

      }, {
        sequelize,
        timestamps: true,
        paranoid: false,
        modelName: 'Shooting',
        tableName: 'shootings',
        comment: 'Shooting',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {

      db.Shooting.belongsToMany(db.User , {through : db.ShootingEvent});

    }
  };
