// interview.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const HrPersonnel = require('./hrPersonnel'); 
const JobApplicant = require('./jobApplicant'); 

const Interview = sequelize.define('interview', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    datetime: Sequelize.DATE,
    location: Sequelize.STRING,
});

Interview.belongsTo(HrPersonnel, { foreignKey: 'recruiterId' });
Interview.belongsTo(JobApplicant, { foreignKey: 'applicantId' });

module.exports = Interview;
