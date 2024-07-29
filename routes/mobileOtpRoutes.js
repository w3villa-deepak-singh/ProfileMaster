const express = require('express');
const router = express.Router();
const mobileOtpController = require('../controllers/mobileOtpController');

// Middleware to ensure user is authenticated
// const authMiddleware = (req, res, next) => {
//     if (req.session && req.session.UID) {
//       next();
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   };

  

router.post('/send-mobile-otp', mobileOtpController.sendMobileOtp);

module.exports = router;