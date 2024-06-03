// leaveRequest.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const LeaveType= sequelize.define('leaveType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    days: Sequelize.INTEGER
});


module.exports = LeaveType;
