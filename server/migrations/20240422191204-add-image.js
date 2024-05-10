"use strict"

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("employees", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("employees", "image")
  },
}
