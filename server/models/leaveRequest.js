// leaveRequest.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');
const HRPersonnel = require('./hrPersonnel');

const LeaveRequest = sequelize.define('leaveRequest', {
    requestID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    leaveType: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    reason: Sequelize.STRING,
    status: Sequelize.STRING,
    comments: Sequelize.STRING
});

LeaveRequest.belongsTo(Employee, { foreignKey: 'employeeID' }); // Many-to-one relationship with Employee
LeaveRequest.belongsTo(HRPersonnel, { foreignKey: 'hrPersonnelID' }); // Many-to-one relationship with HRPersonnel

module.exports = LeaveRequest;
