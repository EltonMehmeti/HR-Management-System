const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Puntor = require('./puntor');

const Contract = sequelize.define("contract", {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      startDate: Sequelize.DATE,
  })

  Contract.belongsTo(Puntor, { foreignKey: 'puntorID' }); 

  module.exports = Contract;  