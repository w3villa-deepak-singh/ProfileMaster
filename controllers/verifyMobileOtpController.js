const { UserProfile, UserOTP } = require('../models');
const { sendResponse } = require('../utils/responseHelper');

const verifyMobileOtp = async (req, res) => {
  const { otp } = req.body;
  console.log("otp::::::::::::::::::::", otp);
  const UID = req.session.UID;
  console.log('UID from session::::::::::::::::::::::::', UID);

  if (!UID) {
    console.log('User not authenticated. UID is not present in session.');
    return sendResponse(res, 401, 'UID is not present', null);
  }

  try {
    // Find the latest OTP record for the UID
    const latestOtpRecord = await UserOTP.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (!latestOtpRecord) {
      return sendResponse(res, 404, 'OTP record not found', null);
    }

    if (latestOtpRecord.otp !== otp) {
      return sendResponse(res, 400, 'Invalid OTP', null);
    }

    // OTP is valid, update user profile with mobile number
    const user = await UserProfile.findOne({ where: { UID } });

    if (user) {
      user.mobileNumber = latestOtpRecord.mobileNumber;
      user.is_mobile_verified = true;
      await user.save();

      // Delete OTP record after successful verification
    //   await UserOTP.destroy({ where: { UID } });

      sendResponse(res, 200, 'Mobile number verified and updated successfully', null);
    } else {
      sendResponse(res, 404, 'User not found', null);
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    sendResponse(res, 500, 'Internal Server Error', null);
  }
};

module.exports = {
  verifyMobileOtp,
};
