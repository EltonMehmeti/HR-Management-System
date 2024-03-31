// attendanceRecord.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');

const AttendanceRecord = sequelize.define('attendanceRecord', {
    recordID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: Sequelize.DATEONLY,
    timeIn: Sequelize.TIME,
    timeOut: Sequelize.TIME,
    status: Sequelize.STRING 
});

AttendanceRecord.belongsTo(Employee, { foreignKey: 'employeeID', as: 'employee' });

module.exports = AttendanceRecord;
