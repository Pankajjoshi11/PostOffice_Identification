const bcrypt = require('bcrypt');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid'); // For generating unique postOfficeId

// Function to generate a unique postOfficeId based on pincode
const generatePostOfficeId = (pincode) => {
  // For simplicity, we'll use a UUID combined with the pincode.
  // Adjust this function if you have a more specific logic for generating postOfficeId.
  return `${uuidv4()}-${pincode}`;
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, pincode, deliveryStatus, district, state, password } = req.body;

  console.log('Received registration request:', req.body); // Debugging line

  try {
    // Check if the user already exists by email, assuming you want uniqueness by email
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate postOfficeId
    const postOfficeId = generatePostOfficeId(pincode);

    // Create a new user
    const user = await User.create({
      name,
      pincode,
      deliveryStatus,
      district,
      state,
      password: hashedPassword, // Save the hashed password
      postOfficeId, // Save the generated postOfficeId
    });

    console.log('New user created:', user); // Debugging line

    res.status(201).json({
      _id: user._id,
      name: user.name,
      postOfficeId: user.postOfficeId, // Include postOfficeId in the response
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

    res.status(200).json({ 
      message: 'Login successful', 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        postOfficeId: user.postOfficeId // Include postOfficeId in the response
      } 
    });
  } catch (error) {
    console.error('Error in loginUser:', error); // Debugging line
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
