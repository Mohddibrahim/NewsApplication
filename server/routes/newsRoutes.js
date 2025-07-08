
const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');

 // Public route: 10 latest headlines
router.get('/latest', async (req, res) => {
  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=25&apikey=${process.env.GNEWS_API_KEY}`
    );
    res.status(200).json(response.data.articles);
  } catch (err) {
    console.error(" Failed to fetch news from GNews:", err.message);
    res.status(500).json({ message: ' Failed to load latest news.' });
  }
});

// Protected route: all top headlines (need login)
router.get('/all', auth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=25&apikey=${process.env.GNEWS_API_KEY}`
    );
    res.status(200).json(response.data.articles);
  } catch (err) {
    console.error(" Failed to fetch all news:", err.message);
    res.status(500).json({ message: ' Failed to load full news feed.' });
  }
});

module.exports = router;
