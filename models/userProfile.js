const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserProfile = sequelize.define('UserProfile', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  UID: {
    type: DataTypes.STRING(36),
    allowNull: false,
    unique: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: true,
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
    defaultValue: () => Math.floor(Date.now() / 1000),
  },

  updatedAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
    defaultValue: () => Math.floor(Date.now() / 1000),
  },

});

module.exports = UserProfile;
