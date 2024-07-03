const Sequelize = require("sequelize")
const sequelize = require("../util/database")
const Group = require("./group")

const Member = sequelize.define("Member", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: false,
  },
  groupId: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: "id",
    },
    allowNull: false,
  },
})

// Define the association
Group.hasMany(Member, { foreignKey: "groupId" })
Member.belongsTo(Group, { foreignKey: "groupId" })

module.exports = Member