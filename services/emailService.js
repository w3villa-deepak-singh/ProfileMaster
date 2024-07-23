const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

const sendConfirmationEmail = async (to, otp) => {
  console.log("Sen:",  process.env.EMAIL);
  console.log("Sending email to:", to);

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Account Confirmation',
    text: `Please confirm your account using the following OTP: ${otp}`,
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
