const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { UserProfile } = require('../models');
const { UserOTP } = require('../models');
const {sendResponse} = require('../utils/responseHelper');
const { sendConfirmationEmail } = require('../services/emailService');




const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// // Function to send OTP
const sendOTP = async (UID, email) => {
    const otp = generateOTP();
    const timestamp = Math.floor(Date.now() / 1000); // Current epoch time in seconds
  
    // Save OTP to UserOTP table
    await UserOTP.create({
      UID,
      email,
      otp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  
    
      console.log(`OTP for ${email}: ${otp}`);
    return otp; // Return OTP to use in email    
  
  };

  


const signup = async (req, res) => {


    console.log('Received signup request:', req.body);  

  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserProfile.findOne({ where: { email } });
    if (existingUser) {
      return sendResponse(res, 400, 'User already exists', null);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate UID
    const UID = uuidv4();
    console.log("Generated UID:", UID);

    // // Create user profile
    const newUser = await UserProfile.create({
      UID,
      email,
      password: hashedPassword,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });


     // Send OTP
    //  await sendOTP(newUser.UID, email);
    const otp = await sendOTP(newUser.UID, email);
    


    // //    // Send OTP email
    const confirmationUrl = `http://localhost:3000/api/verify-otp?UID=${newUser.UID}&otp=${otp}`;
    console.log("confirmtionurlllllllllll",confirmationUrl)

        // Send OTP email
        // await sendConfirmationEmail(email, otp);
    // await sendConfirmationEmail(email, 'Confirm Your Email Address', `Please click the following link to confirm your email address: ${confirmationUrl}`);


    sendResponse(res, 201, 'User registered successfully.', { UID: newUser.UID, email: newUser.email });
    
  } catch (error) {
    console.error('Error during signup:', error);
    return sendResponse(res, 500, 'Internal Server Error', null);
  }
};

module.exports = { signup };
