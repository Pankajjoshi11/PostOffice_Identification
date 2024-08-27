const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  consignmentNo: { type: String, required: true },
  senderName: { type: String, required: true },
  senderNumber: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverNumber: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
