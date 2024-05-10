'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('interviewees', 'resume', {
      type: Sequelize.STRING,
      allowNull: true, // Or false depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('interviewees', 'resume');
  }
};
