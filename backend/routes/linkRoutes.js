const express = require('express');
const crypto = require('crypto');
const Link = require('../models/Link');
const twilio = require('twilio');

const router = express.Router();

// Twilio setup
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Route to generate a unique link and send it via SMS
router.post('/generate-link-and-send-sms', async (req, res) => {
  const { phoneNumber, consignmentNo } = req.body;

  // Generate a unique ID and set expiration time for 2 hours
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

  try {
    // Save the link with the unique ID, consignment number, and expiration time
    const newLink = new Link({ uniqueId, expiresAt, consignmentNo });
    await newLink.save();

    // Generate the update URL with the unique ID
    const updateUrl = `http://localhost:3000/update-address/${uniqueId}`;
    const messageBody = `We noticed an issue with your address. Please update it using the following link: ${updateUrl}`;

    // Send the SMS using Twilio
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: '+12568249637', // Your Twilio phone number
      to: phoneNumber,      // Phone number provided in the request
    });

    // Return success response with the message SID
    res.json({ message: 'SMS sent successfully', sid: message.sid, link: updateUrl });
  } catch (error) {
    console.error('Error generating link or sending SMS:', error);
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
