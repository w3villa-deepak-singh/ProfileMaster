const express = require('express');
const { showAllCourse } = require('../controllers/showCourses');


const router = express.Router();

router.get('/showAllCourse', showAllCourse);

module.exports = router;
