const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute'); // Import the post routes
require('dotenv').config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Use the post routes


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
