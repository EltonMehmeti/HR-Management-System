const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Team = require('./team');

const Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    teamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Team, 
            key: 'id'
        }
    },
    salary: Sequelize.DOUBLE
});

module.exports = Employee;
