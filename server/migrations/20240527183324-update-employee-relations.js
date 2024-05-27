'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify reportsTo in Employees
    await queryInterface.changeColumn('employees', 'reportsTo', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'employees', // name of the table being referenced
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Add foreign key constraint to Teams for leaderId
    await queryInterface.addConstraint('teams', {
      fields: ['leaderId'],
      type: 'foreign key',
      name: 'team_leader_fk',
      references: {
        table: 'employees',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Add foreign key constraint to Performances for employeeId
    await queryInterface.addConstraint('performances', {
      fields: ['employeeId'],
      type: 'foreign key',
      name: 'performance_employee_fk',
      references: {
        table: 'employees',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint from Teams for leaderId
    await queryInterface.removeConstraint('teams', 'team_leader_fk');
    
    // Remove foreign key constraint from Performances for employeeId
    await queryInterface.removeConstraint('performancs', 'performance_employee_fk');

    // Revert reportsTo in Employees
    await queryInterface.changeColumn('employees', 'reportsTo', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
};
