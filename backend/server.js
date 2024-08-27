const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
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
    .create({s
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

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
