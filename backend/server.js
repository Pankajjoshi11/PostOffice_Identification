const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const postRoutes = require('./routes/postRoute');
const userRoutes= require('./routes/userRoute')
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api', postRoutes);
app.use('/api', userRoutes); // Define base path for user routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//controllers are for adding logic of get, put, post