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
    res.json({ link: `http://localhost:3000/update-address/${uniqueId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to validate and get address details
router.get('/validate-link/:uniqueId', async (req, res) => {
  const { uniqueId } = req.params; // Corrected line

  try {
    const link = await Link.findOne({ uniqueId }); // Corrected line
    if (!link || link.expiresAt < new Date()) {
      return res.status(400).json({ valid: false }); // Corrected response
    }

    res.json({ valid: true, consignmentNo: link.consignmentNo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
