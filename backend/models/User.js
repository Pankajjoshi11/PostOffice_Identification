const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pincode: { type: String, required: true },
  
  district: { type: String, default: '' },
  state: { type: String, default: '' },
  password: { type: String, required: true }, // Storing plain text for now, but should be hashed in production
});

const User = mongoose.model('User', userSchema);

module.exports = User;
