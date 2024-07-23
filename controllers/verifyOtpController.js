const { UserProfile, UserOTP } = require('../models');

const verifyOtp = async (req, res) => {
  const { uid, otp } = req.query;

  try {
    // Find OTP entry with the given UID and OTP
    const otpEntry = await UserOTP.findOne({ where: { UID: uid, otp } });

    if (!otpEntry) {
      return res.status(400).send('Invalid OTP.');
    }

    // Check if the OTP has expired
    // if (otpEntry.otpExpiresAt < Math.floor(Date.now() / 1000)) {
    //   return res.status(400).send('OTP has expired.');
    // }

    // Find the user and activate the account
    const user = await UserProfile.findOne({ where: { UID: uid } });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    user.isActive = true;
    await user.save();

    res.send('Email confirmed successfully! Your account is now active.');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { verifyOtp };
