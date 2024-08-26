const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true },
  street: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Storing plain text for now, but should be hashed in production
});



const User = mongoose.model('User', userSchema);

module.exports = User;
