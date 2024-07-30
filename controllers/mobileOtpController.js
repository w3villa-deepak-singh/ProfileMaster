const { UserOTP } = require('../models');
const { generateOTP, sendOTP } = require('../services/otpMobileService');
const { sendResponse } = require('../utils/responseHelper');

const sendMobileOtp = async (req, res) => {

  const { mobileNumber } = req.body;
  console.log("mobileNumber::::::::::", mobileNumber)
  const UID = req.session.UID;
  console.log('UID from session::::::::::::::::::::::::', UID);

  if (!UID) {
    console.log('User not authenticated. UID is not present in session.');
    return sendResponse(res, 401, 'User not authenticated', null);
  }

  try {
    const otp = generateOTP();
    const timestamp = Math.floor(Date.now() / 1000);

    // Create new OTP record
    await UserOTP.create({
      mobileNumber,
      otp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    console.log('Created new OTP record for:', mobileNumber);

    // Send OTP via Twilio
    await sendOTP(mobileNumber, otp);

    sendResponse(res, 200, 'OTP sent successfully', null);
  } catch (error) {
    console.error('Error sending OTP:', error);
    sendResponse(res, 500, 'Internal Server Error', null);
  }
};


module.exports = {
  sendMobileOtp,
};
