const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Explorer = sequelize.define("explorer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Explorer