const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Route to update address details
router.post('/update-address', async (req, res) => {
  const { consignmentNo, address } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate({ consignmentNo }, address, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Consignment number not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

