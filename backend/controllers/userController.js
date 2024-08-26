const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, number, state, city, pincode, area, street, email, password } = req.body;

  console.log('Received registration request:', req.body); // Debugging line

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    console.log('User exists:', userExists); // Debugging line

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with plain password (for debugging only)
    const user = await User.create({
      name,
      number,
      state,
      city,
      pincode,
      area,
      street,
      email,
      password, // Save the plain password
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

    // Compare the provided password with the stored password in the database
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in loginUser:', error); // Debugging line
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
