import db from "../config/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createTransport } from "nodemailer";

// Configure email transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // ✅ Fixed: was EMAIL_PASSWORD
  },
});

// Function to send reset email
const sendResetEmail = async (email, token) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request - Smart Dharani",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #48bb78;">🌾 Smart Dharani - Password Reset</h2>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #48bb78; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
        <p><strong>This link will expire in 15 minutes.</strong></p>
        <p style="color: #666;">If you didn't request this, please ignore this email.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">Smart Dharani - Empowering Farmers</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Reset email sent to:', email);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Request password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // ✅ Fixed: Using db.execute() with promises instead of callbacks
    const [results] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    // Always show success message for security
    if (results.length === 0) {
      return res.status(200).json({ 
        message: "If the email exists, you will receive a password reset link." 
      });
    }

    const userId = results[0].id;

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Set expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Delete any existing tokens for this user
    await db.execute(
      "DELETE FROM password_resets WHERE user_id = ?",
      [userId]
    );

    // Insert new token
    await db.execute(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt]
    );

    // Send reset email
    await sendResetEmail(email, token);
    
    res.status(200).json({ 
      message: "If the email exists, you will receive a password reset link." 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Verify reset token
export const verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    const [results] = await db.execute(
      `SELECT pr.user_id, pr.expires_at, u.email 
       FROM password_resets pr 
       JOIN users u ON pr.user_id = u.id 
       WHERE pr.token = ?`,
      [token]
    );

    if (results.length === 0) {
      return res.status(400).json({ 
        message: "Invalid or expired reset link", 
        valid: false 
      });
    }

    const resetData = results[0];
    const now = new Date();
    const expiresAt = new Date(resetData.expires_at);

    if (now > expiresAt) {
      return res.status(400).json({ 
        message: "Reset link has expired. Please request a new one.", 
        valid: false 
      });
    }

    res.status(200).json({ 
      message: "Token is valid", 
      valid: true, 
      email: resetData.email 
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ 
      message: "Error verifying token", 
      valid: false 
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  // Validate passwords
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ 
      message: "Password must be at least 6 characters" 
    });
  }

  try {
    // Verify token and check expiration
    const [results] = await db.execute(
      "SELECT user_id, expires_at FROM password_resets WHERE token = ?",
      [token]
    );

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const resetData = results[0];
    const now = new Date();
    const expiresAt = new Date(resetData.expires_at);

    if (now > expiresAt) {
      return res.status(400).json({ 
        message: "Reset link has expired. Please request a new one." 
      });
    }

    const userId = resetData.user_id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in users table
    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );

    // Delete the used token
    await db.execute(
      "DELETE FROM password_resets WHERE token = ?",
      [token]
    );

    console.log('✅ Password reset successful for user:', userId);

    res.status(200).json({ 
      message: "Password reset successful! You can now login with your new password." 
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      message: "Error resetting password. Please try again." 
    });
  }
};
