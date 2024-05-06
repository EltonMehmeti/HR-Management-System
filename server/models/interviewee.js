// jobApplicant.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const JobOffer = require('./jobOffer');

const Interviewee = sequelize.define('interviewee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM('first_interview', 'job_offer', 'hired', 'rejected'),
        defaultValue: 'first_interview',
    },
    phone: Sequelize.STRING,
    resume: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
});
Interviewee.belongsTo(JobOffer); 
module.exports = Interviewee;
