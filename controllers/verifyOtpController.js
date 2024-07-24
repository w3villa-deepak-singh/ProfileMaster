const express = require('express');
const { UserOTP, UserProfile } = require('../models'); 
const { sendResponse } = require('../utils/responseHelper');

const verifyOtp = async (req, res) => {
  const { uid, otp } = req.query;

 
  try {
    // Fetch OTP record from database
    const otpRecord = await UserOTP.findOne({ where: { otp, UID: uid } });

    if (!otpRecord) {
      return sendResponse(res, 400, 'Invalid OTP', null);
    }

    // Validate OTP (you can also add additional checks such as expiration)
    // const currentTime = Math.floor(Date.now() / 1000);
    // const otpValidityPeriod = 5 * 60; // OTP valid for 5 minutes
    // if (currentTime - otpRecord.createdAt > otpValidityPeriod) {
    //   return sendResponse(res, 400, 'OTP has expired', null);
    // }

    // If OTP is valid, update user status or perform necessary actions
    await UserProfile.update(
      { status: 'ACTIVE' }, // or any other status update required
      { where: { UID: uid } }
    );

    // // Delete OTP record after successful verification
    // await UserOTP.destroy({ where: { otp, UID: uid } });

    return sendResponse(res, 200, 'OTP verified successfully', null);
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return sendResponse(res, 500, 'Internal Server Error', null);
  }

};

module.exports = { verifyOtp };
