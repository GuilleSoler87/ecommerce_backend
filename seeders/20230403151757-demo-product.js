'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product1',
        price: '29.90',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product2',
        price: '39.90',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product3',
        price: '49.90',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product4',
        price: '59.90',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product5',
        price: '69.90',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
