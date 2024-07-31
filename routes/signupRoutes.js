const express = require('express');
const { signup } = require('../controllers/signupController');
const { loginUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', loginUser);

module.exports = router;
