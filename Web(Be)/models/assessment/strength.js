"use strict"

const Sequelize = require('sequelize');

module.exports = class Strength extends Sequelize.Model {
    static init(sequelize){
      return super.init({
       
        date : {
            type : Sequelize.DATEONLY,
            allowNull : false,
            unique : true,
        },
        time:{
          type : Sequelize.STRING,
          allowNull : false,
          defaultValue : "12"
        }
        ,
        expired : {
            type : Sequelize.ENUM('Full','Applying','Expired'),
            allowNull : false,
            defaultValue : 'Applying',
        },
        applicant_capacity : {
            type : Sequelize.INTEGER,
            allowNull : false,
            defaultValue : 20,

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
        modelName: 'Strength',
        tableName: 'strengths',
        comment: 'Strength',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
    static associate(db) {

      db.Strength.belongsToMany(db.User , {through : db.StrengthEvent});

    }
  };
