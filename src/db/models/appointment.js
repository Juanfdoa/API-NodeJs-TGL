const { DataTypes } = require('sequelize');
const sequelize = require('../sequalize'); 

const appointment = sequelize.define('appointment', {
  id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointment_date:{
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hour:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = appointment;