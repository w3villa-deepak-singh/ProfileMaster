// controllers/userController.js
const { UserProfile } = require('../models');

// Controller to update user profile
const updateUserProfile = async (req, res) => {
  const { UID } = req.params; 
  console.log("update user data ,UID:::::", UID)
  const {firstName, lastName, address,city,country, imgURL, profession } = req.body;

  if (!UID) {
    return res.status(400).json({ message: 'UID is required' });
  }

  try {
    const [updated] = await UserProfile.update(
      { firstName, lastName, address, city, country, imgURL, profession },
      { where: { UID }}
    );
      

    console.log(`Number of affected rows: ${updated}`);


       // Check if any rows were affected
       if (updated > 0) {
        // Retrieve the updated user profile
        const updatedUser = await UserProfile.findOne({ where: { UID } });
  
        // If the user is found, return the updated data
        if (updatedUser) {
          return res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
        }
  
        // If the user is not found after the update, respond with an error
        return res.status(404).json({ message: 'User not found after update' });
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
