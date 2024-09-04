const express = require('express');
const { showAllCourse,addCourse ,fetchByUniqueId} = require('../controllers/showCourses');


const router = express.Router();

router.get('/showAllCourse', showAllCourse);
router.post('/addCourse', addCourse);
router.get('/courses/:id', fetchByUniqueId);

module.exports = router;
