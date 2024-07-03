const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Puntor = sequelize.define("puntor", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

  });


  module.exports = Puntor
  