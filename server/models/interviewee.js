// jobApplicant.js

const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Interviewee = sequelize.define("interviewee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: Sequelize.STRING,
  resume: Sequelize.STRING,
  jobTitle: Sequelize.STRING,
})

module.exports = Interviewee
