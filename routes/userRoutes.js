// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');

// Route to update user profile
router.patch('/update-profile/:UID', updateUserProfile);


module.exports = router;
