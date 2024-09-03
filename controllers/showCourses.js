const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Course } = require('../models');
const { sendResponse } = require('../utils/responseHelper');






const showAllCourse = async (req, res) => {

  try {
    // Fetch all courses from the database
    const courses = await Course.findAll();

    // Send the list of courses as a response
    sendResponse(res, 200, 'Courses retrieved successfully', courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }

};


const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      description,
      duration,
      start_date,
      end_date,
      category,
      price,
      rating,
      trainer,
      oldprice,
      rating_count,
    } = req.body;

    const newCourse = await Course.create({
      course_name,
      description,
      duration,
      start_date,
      end_date,
      category,
      price,
      rating,
      trainer,
      oldprice,
      rating_count,
    });

    sendResponse(res, 200, 'Course added successfully', newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { showAllCourse, addCourse };
