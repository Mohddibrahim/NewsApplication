const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // JWT middleware
const User = require('../models/User');

//  Register route
router.post('/register', register);

//  Login route
router.post('/login', login);

//  Get logged-in user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
