const express = require('express');
const router = express.Router();
const mobileOtpController = require('../controllers/mobileOtpController');
const  verifyMobileOtpController  = require('../controllers/verifyMobileOtpController');
const { jwtAuthMiddleware,generateToken} = require('../jwt')
  

router.post('/send-mobile-otp', mobileOtpController.sendMobileOtp);
router.post('/verify-mobile-otp', verifyMobileOtpController.verifyMobileOtp);

module.exports = router;