const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserOTP = sequelize.define('UserOTP', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },

  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },

  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
  },
  
  updatedAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
  },

});

module.exports = UserOTP;
