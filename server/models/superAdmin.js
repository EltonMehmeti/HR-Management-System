// employee.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const SuperAdmin = sequelize.define("superAdmin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = SuperAdmin
