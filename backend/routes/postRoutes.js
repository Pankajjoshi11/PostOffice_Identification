const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostByConsignmentNo,
  updatePostByConsignmentNo,
  deletePostByConsignmentNo
} = require('../controllers/postController');

const router = express.Router({ mergeParams: true });

// Define routes without middleware
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:consignmentNo', getPostByConsignmentNo);
router.put('/:consignmentNo', updatePostByConsignmentNo);
router.delete('/:consignmentNo', deletePostByConsignmentNo);

module.exports = router;
