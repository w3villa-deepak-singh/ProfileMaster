const { UserProfile } = require('../models');
const { sendResponse } = require('../utils/responseHelper');
const bcrypt = require('bcrypt'); 

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, 'email and password are required', null);
  }

  try {
    // Find the user by username
    const user = await UserProfile.findOne({ where: { email } });

    if (!user) {
      return sendResponse(res, 404, 'email not found', null);
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, 401, 'Invalid password', null);
    }

    // Check email and mobile verification
    if (user.is_email_verified && user.is_mobile_verified) {
      // User is verified and login is successful
      return sendResponse(res, 200, 'Login successful', { user });
    } else {
      return sendResponse(res, 400, 'Please verify your email and/or mobile number', null);
    }
  } catch (error) {
    console.error('Error during login:', error);
    return sendResponse(res, 500, 'Internal Server Error', null);
  }
};

module.exports = { loginUser };

