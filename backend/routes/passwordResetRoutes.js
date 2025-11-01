import express from "express";
import { 
  forgotPassword, 
  verifyResetToken, 
  resetPassword 
} from "../controllers/passwordResetController.js";

const router = express.Router();

// Request password reset
router.post("/forgot-password", forgotPassword);

// Verify reset token
router.get("/verify-token/:token", verifyResetToken);

// Reset password
router.post("/reset-password/:token", resetPassword);

export default router;
