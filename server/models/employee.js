// employee.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Team = require('./team');
const Performance = require('./performance'); 

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
    salary: Sequelize.DOUBLE,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Employee.belongsToMany(Team, { through: 'EmployeeTeam' });
Team.belongsToMany(Employee, { through: 'EmployeeTeam' });
Team.belongsTo(Employee, { foreignKey: 'teamLeaderId', as: 'teamLeader' });
Employee.hasMany(Performance); 

module.exports = Employee;
