const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
  const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(' Fetch user error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

//  Update basic user profile (name/email)
router.put('/profile', auth, async (req, res) => {
  const { name, email, username, gender, bio, profileImage } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, username, gender, bio, profileImage },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});



//  Multer setup for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads' folder exists at root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage });

//  Upload profile photo
router.post('/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
