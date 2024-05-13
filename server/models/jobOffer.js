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
   file: Sequelize.STRING
});

module.exports = JobOffer;
