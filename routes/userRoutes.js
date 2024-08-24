// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');

// Route to update user profile
router.put('/update-profile', updateUserProfile);

module.exports = router;
