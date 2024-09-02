const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Courses } = require('../models');
const {sendResponse} = require('../utils/responseHelper');






const showAllCourse = async (req, res) => {

  try {

   
    sendResponse(res, 200, 'show all courses');
  
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { showAllCourse };
