// models/UserProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserProfile = sequelize.define('UserProfile', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  UID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DISABLE', 'DELETED'),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },

  subscription_type: {
    type: DataTypes.ENUM('FREE', 'SILVER', 'GOLD'),
    allowNull: false,
    defaultValue: 'FREE',
  },

  createdAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

});

module.exports = UserProfile;
