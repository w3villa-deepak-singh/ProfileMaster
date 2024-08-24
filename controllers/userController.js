// controllers/userController.js
const { UserProfile } = require('../models');

// Controller to update user profile
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, address,city,country, imgURL, profession } = req.body;

  if (!UID) {
    return res.status(400).json({ message: 'UID is required' });
  }

  try {
    const [updated] = await UserProfile.update(
      { firstName, lastName, address, city, country, imgURL, profession },
      { where: { UID }, returning: true }
    );

    if (updated) {
      const updatedUser = await UserProfile.findOne({ where: { UID } });
      return res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Error updating user profile', error });
  }
};

module.exports = {
  updateUserProfile
};
