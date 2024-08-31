const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, pincode, deliveryStatus, district, state, password } = req.body;

  console.log('Received registration request:', req.body); // Debugging line

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });

    console.log('User exists:', userExists); // Debugging line

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      pincode,
      deliveryStatus,
      district,
      state,
      password: hashedPassword, // Save the hashed password
    });

    console.log('New user created:', user); // Debugging line

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error in registerUser:', error); // Debugging line
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', req.body); // Debugging line

  try {
    const user = await User.findOne({ email });

    console.log('User found:', user); // Debugging line

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in loginUser:', error); // Debugging line
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
