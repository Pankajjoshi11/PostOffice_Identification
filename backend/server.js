const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute'); // Updated to include authentication routes
const postRoutes = require('./routes/postRoutes');
const shipmentRoutes = require('./routes/shipments');
const Post = require('./models/Post'); // Import Post model

require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes); // Authentication routes are now included in userRoutes
app.use('/api/:postOfficeId/posts', postRoutes);
app.use('/api/shipments', shipmentRoutes); // Public route for shipments

// Twilio setup
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
if (!accountSid || !authToken) {
  console.error('Twilio credentials are not set in environment variables');
  process.exit(1);
}
const twilioClient = twilio(accountSid, authToken);

// Twilio SMS route
app.post('/api/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  console.log('Received phoneNumber:', phoneNumber);
  console.log('Received message:', message);

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }
});

// Twilio SMS route
app.post('/send-update-link', async (req, res) => {
  const { phoneNumber, consignmentNo } = req.body;

  try {
    // Find the post by consignment number
    const post = await Post.findOne({ consignmentNo });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the address is already verified
    if (post.addressVerified) {
      return res.status(400).json({ message: 'Address is already verified. No SMS sent.' });
    }

    // Create the update URL using the consignment number
    const updateUrl = `http://localhost:3000/update-address/${consignmentNo}`;
    const messageBody = `Hey, we found a discrepancy in your address. Please correct it using the following link: ${updateUrl}`;

    // Send SMS using Twilio
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: '+12568249637', // Your Twilio phone number
      to: phoneNumber, // Use the phone number from the request body
    });

    // Return the SID of the sent message as a response
    return res.json({ sid: message.sid });
  } catch (error) {
    console.error('Twilio Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Update post by consignmentNo
app.put('/api/posts/:consignmentNo', async (req, res) => {
  const { consignmentNo } = req.params;
  const updateData = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { consignmentNo },
      { $set: updateData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
