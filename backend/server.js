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
app.use(cors()); // Ensure this is placed before your routes
app.use(express.json());

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

  twilioClient.messages
    .create({
      body: message,
      from: '+919653268068', // Your Twilio number
      to: phoneNumber,
    })
    .then((message) => res.json({ sid: message.sid }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
