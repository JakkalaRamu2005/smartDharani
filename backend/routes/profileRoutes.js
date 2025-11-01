import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// Get profile by user ID
router.get('/profile/:id', getProfile);

// Update profile by user ID
router.put('/profile/:id', updateProfile);

export default router;
