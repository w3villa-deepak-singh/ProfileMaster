const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Course = sequelize.define('Course', {

    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
      },
      trainer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oldprice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999,
      },
      rating_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50,
      },

});

module.exports = Course;
