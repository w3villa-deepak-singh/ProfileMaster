const express = require('express');
const { showAllCourse,addCourse } = require('../controllers/showCourses');


const router = express.Router();

router.get('/showAllCourse', showAllCourse);
router.post('/addCourse', addCourse);

module.exports = router;
