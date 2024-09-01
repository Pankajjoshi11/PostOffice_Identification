const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

module.exports = router;
