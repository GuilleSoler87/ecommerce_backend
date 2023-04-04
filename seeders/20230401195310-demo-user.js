'use strict';
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const password = '123456';
const hashedPassword = bcrypt.hashSync(password, saltRounds);

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    

    return queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        email: 'example@example.com',
        password: hashedPassword,
        role: 'user',
        confirmed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alisse',
        email: 'example2@example.com',
        password: hashedPassword,
        role: 'user',
        confirmed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
