// performance.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');

const Performance = sequelize.define('performance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rating: Sequelize.INTEGER, 
    feedback: Sequelize.TEXT,   
    date: Sequelize.DATE       
});


module.exports = Performance;
