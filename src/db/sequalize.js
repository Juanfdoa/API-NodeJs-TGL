const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mydatabase.sqlite',
});

module.exports = sequelize;