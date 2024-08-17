const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, number, state, city, pincode, area, street, email, password } = req.body;

    // Create a new user instance with the additional fields
    const newUser = new User({ name, number, state, city, pincode, area, street, email, password });
    
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

module.exports = {
  registerUser,
};
