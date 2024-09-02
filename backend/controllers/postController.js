const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  const { consignmentNo, senderName, senderNumber, receiverName, receiverNumber, state, city, pincode, area, addressLine1, addressLine2, deliveryStatus, expiresAt, uniqueId } = req.body;
  
  try {
    const post = new Post({
      consignmentNo,
      senderName,
      senderNumber,
      receiverName,
      receiverNumber,
      state,
      city,
      pincode,
      area,
      addressLine1,
      addressLine2,
      deliveryStatus,
      expiresAt,
      uniqueId
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Get a single post by consignmentNo
exports.getPostByConsignmentNo = async (req, res) => {
  const { consignmentNo } = req.params;

  try {
    const post = await Post.findOne({ consignmentNo });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

// Update a post by consignmentNo
exports.updatePostByConsignmentNo = async (req, res) => {
  const { consignmentNo } = req.params;
  const updateData = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      { consignmentNo },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
};

// Delete a post by consignmentNo
exports.deletePostByConsignmentNo = async (req, res) => {
  const { consignmentNo } = req.params;

  try {
    const post = await Post.findOneAndDelete({ consignmentNo });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
