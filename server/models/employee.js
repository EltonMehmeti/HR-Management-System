// employee.js

const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const Team = require("./team")
const Performance = require("./performance")

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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reportsTo: Sequelize.INTEGER,
})

Employee.belongsToMany(Team, { through: "EmployeeTeam", as: "members" })
Team.belongsToMany(Employee, { through: "EmployeeTeam", as: "members" })
Team.belongsTo(Employee, { foreignKey: "leaderId", as: "teamLeader" })
Employee.hasMany(Performance)
Employee.belongsTo(Employee, { foreignKey: "reportsTo", as: "reportingTo" })

module.exports = Employee
