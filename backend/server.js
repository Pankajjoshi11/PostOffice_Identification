const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoutes');
const Post = require('./models/Post'); // Import Post model
const jwt = require('jsonwebtoken'); // Import JWT for token handling
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Twilio setup
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const twilioClient = twilio(accountSid, authToken);

// Twilio SMS route
app.post('/api/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  // Logging received data
  console.log('Received phoneNumber:', phoneNumber);
  console.log('Received message:', message);

  // Validate input
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }

  // Sending SMS via Twilio
  twilioClient.messages
    .create({
      body: message,
      from: '+12568249637', // Your Twilio number
      to: phoneNumber,
    })
    .then((message) => res.json({ sid: message.sid }))
    .catch((error) => {
      console.error('Twilio Error:', error);
      res.status(500).json({ error: error.message });
    });
});

// Route to validate unique URL and get post data
app.get('/api/validate-link/:uniqueId', async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const post = await Post.findOne({ 'uniqueId': uniqueId });

    if (post) {
      // Check if the link has expired
      const currentTime = new Date().getTime();
      if (currentTime > post.expiryTime) {
        return res.status(400).json({ valid: false });
      }

      res.json({ valid: true, post });
    } else {
      res.status(400).json({ valid: false });
    }
  } catch (error) {
    console.error('Error validating link:', error);
    res.status(500).json({ error: 'An error occurred while validating the link.' });
  }
});

// Route to update address
app.post('/api/update-address', async (req, res) => {
  const { consignmentNo, address } = req.body;

  if (!consignmentNo || !address) {
    return res.status(400).json({ error: 'Consignment number and address are required.' });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { consignmentNo },
      { $set: address },
      { new: true } // Return the updated document
    );

    if (updatedPost) {
      res.json({ message: 'Address updated successfully', post: updatedPost });
    } else {
      res.status(404).json({ error: 'Post not found.' });
    }
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'An error occurred while updating the address.' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
