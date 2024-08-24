const passport = require('passport');

// Start Google OAuth authentication
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Handle Google OAuth callback
const googleCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/failure'
});

// Handle authentication failure
const authFailure = (req, res) => {
  res.send('fail');
};

// Handle logout
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Export the handlers
module.exports = { 
  googleAuth,
  googleCallback,
  authFailure,
  logout
};
