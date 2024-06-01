// leaveRequest.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');
const HRPersonnel = require('./hrPersonnel');
const LeaveType = require('./leaveType');

const LeaveRequest = sequelize.define('leaveRequest', {
    requestID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    reason: Sequelize.STRING,
    status: Sequelize.STRING,
    comments: Sequelize.STRING
});

LeaveRequest.belongsTo(Employee, { foreignKey: 'employeeID' }); // Many-to-one relationship with Employee
LeaveRequest.belongsTo(HRPersonnel, { foreignKey: 'hrPersonnelID' }); // Many-to-one relationship with HRPersonnel
LeaveRequest.belongsTo(LeaveType, { foreignKey: 'leaveTypeID' }); // Many-to-one relationship with LeaveType

module.exports = LeaveRequest;
