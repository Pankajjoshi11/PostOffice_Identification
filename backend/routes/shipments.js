const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to get count of delivered posts
router.get('/count-delivered', async (req, res) => {
  try {
    const count = await Post.countDocuments({ deliveryStatus: 'delivered' }); // Correct field name
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get count of pending posts
router.get('/count-pending', async (req, res) => {
  try {
    const count = await Post.countDocuments({ deliveryStatus: 'pending' }); // Correct field name
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
