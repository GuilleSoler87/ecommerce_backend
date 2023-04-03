'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Category1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
