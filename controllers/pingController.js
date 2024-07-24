const { Ping } = require('../models');
const {sendResponse} = require('../utils/responseHelper');

const ping = async (req, res) => {
  try {
    const message = await Ping.create({ message: 'pong' });
    sendResponse(res, 200, 'Ping-Pong Test Successful', { message: message.message });
  } catch (error) {
    console.error('Error occurred while querying the database:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { ping };
