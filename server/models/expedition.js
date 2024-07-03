const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const Explorer = require("./explorer")

const Expedition = sequelize.define("expedition", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  crewSize: {
    type: Sequelize.INTEGER,
    defaultValue: false,
  },
  explorerID: {
    type: Sequelize.INTEGER,
    references: {
      model: Explorer,
      key: "id",
    },
    allowNull: false,
  },
})

// Define the association
Explorer.hasMany(Expedition, { foreignKey: "explorerID" })
Expedition.belongsTo(Explorer, { foreignKey: "explorerID" })

module.exports = Expedition