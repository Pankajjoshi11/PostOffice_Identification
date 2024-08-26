const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Use the user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
