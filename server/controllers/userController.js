const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, email, avatar } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};
