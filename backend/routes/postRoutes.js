import express from 'express';
import {
  createPost,
  getAllPosts,
  getUserPosts,
  toggleLike,
  addComment,
  getComments,
  sharePost
} from '../controllers/postController.js';

const router = express.Router();

// Create a new post
router.post('/', createPost);

// Get all posts
router.get('/', getAllPosts);

// Get posts by specific user
router.get('/user/:userId', getUserPosts);

// Like/unlike a post
router.post('/:id/like', toggleLike);

// Add a comment to a post
router.post('/:id/comment', addComment);

// Get all comments for a post
router.get('/:id/comments', getComments);

// Share a post
router.post('/:id/share', sharePost);

export default router;
