
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;



console.log(`Twilio Account SID: ${accountSid}`);
console.log(`Twilio Auth Token: ${authToken}`); 
console.log(`Twilio Phone Number: ${twilioPhoneNumber}`);

const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const sendOTP = async (mobileNumber, mobileOtp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${mobileOtp}`,
      from: twilioPhoneNumber,
      to: mobileNumber,
    });
    console.log(`OTP sent successfully to ${mobileNumber}: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  generateOTP,
  sendOTP,
};
