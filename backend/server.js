const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoutes');
const shipmentRoutes = require('./routes/shipments');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

app.use('/api/shipments', shipmentRoutes);
app.use('/api/posts', postRoutes);


// Twilio setup
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const twilioClient = twilio(accountSid, authToken);

// Post list route
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

// Twilio SMS route
app.post('/send-update-link', async (req, res) => {
  const { phoneNumber, consignmentNo } = req.body;
  try {
    const post = await Post.findOne({ consignmentNo });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.addressVerified) return res.status(400).json({ message: 'Address is already verified. No SMS sent.' });

    const updateUrl = `http://localhost:3000/update-address/${consignmentNo}`;
    const message = await twilioClient.messages.create({
      body: `Hey, we found a discrepancy in your address. Please correct it using the following link: ${updateUrl}`,
      from: '+12568249637',
      to: phoneNumber,
    });

    return res.json({ sid: message.sid });
  } catch (error) {
    console.error('Twilio Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
