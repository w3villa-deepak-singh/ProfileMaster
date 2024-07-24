const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD,
  },
});


 // <a href="http://localhost:3000/api/verify-otp?otp=${otp}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">Confirm Account</a>

const sendConfirmationEmail = async (to, otp,uid) => {
  console.log("Sender email:",  process.env.EMAIL);
  console.log("Sending email to:", to);

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: 'Account Confirmation',
    // text: `Please confirm your account using the following OTP: ${otp}`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <p>Please confirm your account using the following OTP:</p>
    <p><strong>${otp}</strong></p>
    <p>Or click the button below to confirm your account:</p>
    <a href="https://e27b-119-82-94-2.ngrok-free.app/api/verify-otp?otp=${otp}&uid=${uid}"
       style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
       Confirm Account
    </a>
  </div>
  `,
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email.');
  }
};

module.exports = { sendConfirmationEmail };
