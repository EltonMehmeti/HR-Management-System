// employee.js

const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const Team = require("./team")

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  salary: Sequelize.DOUBLE,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

// Define associations
Employee.belongsToMany(Team, { through: "EmployeeTeam" }) // Many-to-many relationship with Team
Team.belongsToMany(Employee, { through: "EmployeeTeam" }) // Many-to-many relationship with Employee
Team.belongsTo(Employee, { foreignKey: "leaderId", as: "teamLeader" }) // Team leader association

module.exports = Employee
