import express from 'express';
import {
  getProfile,
  updateProfile
} from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET - Get user profile (protected)
router.get('/:userId', authenticateToken,  getProfile);

// PUT - Update user profile (protected)
router.put('/:userId', authenticateToken, updateProfile);

export default router;
