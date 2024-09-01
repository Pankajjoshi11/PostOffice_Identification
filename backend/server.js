const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoutes');
const shipmentRoutes = require('./routes/shipments'); // Make sure this path is correct

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
router.post('/send-update-link', async (req, res) => {
  const { phoneNumber, consignmentNo } = req.body;

  try {
    // Find the post by consignment number
    const post = await Post.findOne({ consignmentNo });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the address is verified
    if (post.addressVerified) {
      return res.status(400).json({ message: 'Address is already verified. No SMS sent.' });
    }

    // Construct the URL for the user to update their address
    const updateUrl = `http://localhost:3000/update-address/${consignmentNo}`;

    // Send the SMS
    const message = await twilioClient.messages.create({
      body: `Hey, we found a discrepancy in your address. Please correct it using the following link: ${updateUrl}`,
      from: '+12568249637', // Your Twilio number
      to: phoneNumber,
    });

    return res.json({ sid: message.sid });
  } catch (error) {
    console.error('Twilio Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.use('/api/shipments', shipmentRoutes);

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
app.put('/api/update-address/:consignmentNo', async (req, res) => {
  const { consignmentNo } = req.params;
  const {
    addressLine1,
    addressLine2,
    state,
    city,
    pincode,
    area,
    deliveryStatus
  } = req.body;

  try {
    // Find and update the post by consignment number
    const updatedPost = await Post.findOneAndUpdate(
      { consignmentNo },
      {
        addressLine1,
        addressLine2,
        state,
        city,
        pincode,
        area,
        addressVerified: true, // Set addressVerified to true upon update
        deliveryStatus,
      },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Update Address Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
