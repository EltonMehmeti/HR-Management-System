'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jobOffers', 'resume', {
      type: Sequelize.STRING,
      allowNull: true, // Or false depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jobOffers', 'resume');
  }
};
