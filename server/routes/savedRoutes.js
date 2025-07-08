const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Saved = require('../models/saved');

// Save article
router.post('/', auth, async (req, res) => {
  const { title, description, url, image,publishedAt } = req.body;
  try {
    const savedArticle = new Saved({
     user: req.user.userId, 
      title,
      description,
      url,
      image,
      publishedAt
    });
   await savedArticle.save();
    res.status(201).json({ message: 'Article saved successfully' });
  } catch (error) {
    console.error(' Save error:', error.message);
    res.status(500).json({ message: 'Failed to save article' });
  }
});

// Get all saved articles for current user
router.get('/all', auth, async (req, res) => {
  try {
    const articles = await Saved.find({ user: req.user.userId });
    res.json(articles);
  } catch (err) {
    console.error(' Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch saved articles' });
  }
});




router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Saved.findOneAndDelete({
  _id: req.params.id,
  user: req.user.userId   
});


    if (!deleted) return res.status(404).json({ message: 'Article not found' });

    res.json({ message: 'Article deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
