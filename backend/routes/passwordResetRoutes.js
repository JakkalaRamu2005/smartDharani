import express from 'express';
import {
  forgotPassword,
  verifyResetToken,
  resetPassword
} from '../controllers/passwordResetController.js';

const router = express.Router();

// POST - Request password reset (send email)
router.post('/forgot-password', forgotPassword);

// GET - Verify reset token
router.get('/verify-token/:token', verifyResetToken);

// POST - Reset password with token
router.post('/reset-password/:token', resetPassword);

export default router;
