const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute'); // Updated to include authentication routes
const postRoutes = require('./routes/postRoutes');
const shipmentRoutes = require('./routes/shipments');
const Post = require('./models/Post'); // Import Post model

require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// API Routes
app.use('/api/users', userRoutes); // Authentication routes are now included in userRoutes
app.use('/api/:postOfficeId/posts', postRoutes);
app.use('/api/shipments', shipmentRoutes); // Public route for shipments

// Twilio setup
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const twilioClient = twilio(accountSid, authToken);

// Twilio SMS route
app.post('/api/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  console.log('Received phoneNumber:', phoneNumber);
  console.log('Received message:', message);

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }

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

// // Route to validate unique URL and get post data
// app.get('/api/validate-link/:uniqueId', async (req, res) => {
//   const { uniqueId } = req.params;

//   try {
//     const post = await Post.findOne({ uniqueId });

//     if (post) {
//       const currentTime = new Date();
//       if (currentTime > post.expiresAt) {
//         return res.status(400).json({ valid: false });
//       }

//       res.json({ valid: true, post });
//     } else {
//       res.status(400).json({ valid: false });
//     }
//   } catch (error) {
//     console.error('Error validating link:', error);
//     res.status(500).json({ error: 'An error occurred while validating the link.' });
//   }
// });

// Route to update address
app.post('/api/update-address', async (req, res) => {
  const { consignmentNo, address } = req.body;

  if (!consignmentNo || !address || typeof address !== 'object') {
    return res.status(400).json({ error: 'Consignment number and address are required and address should be an object.' });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { consignmentNo },
      { $set: address },
      { new: true, runValidators: true }
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
