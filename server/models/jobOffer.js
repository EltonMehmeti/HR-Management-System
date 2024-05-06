// jobOffer.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const JobOffer = sequelize.define('jobOffer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    position: Sequelize.STRING,
    description: Sequelize.TEXT,
    requirements: Sequelize.TEXT,
    location: Sequelize.STRING,
    salary: Sequelize.FLOAT,
    benefits: Sequelize.TEXT,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE
});

module.exports = JobOffer;
