const express = require('express');
const crypto = require('crypto');
const Link = require('../models/Link');

const router = express.Router();

// Route to generate a unique link
router.post('/generate-link', async (req, res) => {
  const { consignmentNo } = req.body;
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

  try {
    const newLink = new Link({ uniqueId, expiresAt, consignmentNo });
    await newLink.save();
    res.json({ link: `http://localhost:3000/update-address/${consignmentNo}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to validate and get address details
router.get('/validate-link/:uniqueId', async (req, res) => {
  const { consignmentNo } = req.params;

  try {
    const link = await Link.findOne({ consignmentNo });
    if (!link || link.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Link has expired or is invalid' });
    }

    res.json({ valid: true, consignmentNo: link.consignmentNo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
