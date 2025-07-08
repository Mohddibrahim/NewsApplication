const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
