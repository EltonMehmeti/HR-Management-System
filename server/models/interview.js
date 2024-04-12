// interview.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const HrPersonnel = require('./hrPersonnel'); 
const Interviewee = require('./interviewee');

const Interview = sequelize.define('interview', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    datetime: Sequelize.DATE,
    duration: Sequelize.INTEGER,
    agenda: Sequelize.STRING,
    status: Sequelize.STRING,
    join_url: Sequelize.STRING,
});

Interview.belongsTo(HrPersonnel, { foreignKey: 'recruiterId' });
Interview.belongsTo(Interviewee, { foreignKey: 'intervieweeId' });

module.exports = Interview;
