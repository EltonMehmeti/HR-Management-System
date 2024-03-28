// hrPersonnel.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');

const HrPersonnel = sequelize.define('hrPersonnel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    role: 
    {
        type:Sequelize.STRING,
        allowNull: false,
        isIn: [['recruiter','payroll','datamanager']]
    }, 
    joiningDate: Sequelize.DATE,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = HrPersonnel;
