// Salary.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');
const HrPersonnel = require('./hrPersonnel');

const Salary = sequelize.define('salary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    transactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

Salary.belongsTo(Employee, { as: 'employee', foreignKey: 'employeeId' });
Salary.belongsTo(HrPersonnel, { as: 'hrPersonnel', foreignKey: 'hrPersonnelId' });

module.exports = Salary;
