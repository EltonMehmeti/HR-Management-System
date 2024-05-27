const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Docs = sequelize.define("Docs", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["private", "public"],
    defaultValue: "private",
  },
})

module.exports = Docs
