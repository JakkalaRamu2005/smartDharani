import db from "../config/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createTransport } from "nodemailer";

// Configure email transporter (using Gmail as example)
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password or app password
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
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Request password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if user exists
    const sql = "SELECT id FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // Always show success message for security (don't reveal if email exists)
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
      const deleteSql = "DELETE FROM password_resets WHERE user_id = ?";
      db.query(deleteSql, [userId], (deleteErr) => {
        if (deleteErr) {
          console.error("Error deleting old tokens:", deleteErr);
        }

        // Insert new token into database
        const insertSql = "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)";
        db.query(insertSql, [userId, token, expiresAt], async (insertErr) => {
          if (insertErr) {
            console.error("Error saving token:", insertErr);
            return res.status(500).json({ message: "Error processing request" });
          }

          // Send reset email
          try {
            await sendResetEmail(email, token);
            res.status(200).json({ 
              message: "If the email exists, you will receive a password reset link." 
            });
          } catch (emailErr) {
            console.error("Error sending email:", emailErr);
            res.status(500).json({ message: "Error sending email. Please try again." });
          }
        });
      });
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify reset token
export const verifyResetToken = (req, res) => {
  const { token } = req.params;

  const sql = `
    SELECT pr.user_id, pr.expires_at, u.email 
    FROM password_resets pr 
    JOIN users u ON pr.user_id = u.id 
    WHERE pr.token = ?
  `;

  db.query(sql, [token], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", valid: false });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid token", valid: false });
    }

    const resetData = results[0];
    const now = new Date();
    const expiresAt = new Date(resetData.expires_at);

    if (now > expiresAt) {
      return res.status(400).json({ message: "Token has expired", valid: false });
    }

    res.status(200).json({ 
      message: "Token is valid", 
      valid: true, 
      email: resetData.email 
    });
  });
};

// Reset password
export const resetPassword = (req, res) => {
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
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // Verify token and check expiration
  const verifySql = "SELECT user_id, expires_at FROM password_resets WHERE token = ?";
  
  db.query(verifySql, [token], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const resetData = results[0];
    const now = new Date();
    const expiresAt = new Date(resetData.expires_at);

    if (now > expiresAt) {
      return res.status(400).json({ message: "Token has expired" });
    }

    const userId = resetData.user_id;

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update password in users table
    const updateSql = "UPDATE users SET password = ? WHERE id = ?";
    
    db.query(updateSql, [hashedPassword, userId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating password:", updateErr);
        return res.status(500).json({ message: "Error updating password" });
      }

      // Delete the used token
      const deleteSql = "DELETE FROM password_resets WHERE token = ?";
      db.query(deleteSql, [token], (deleteErr) => {
        if (deleteErr) {
          console.error("Error deleting token:", deleteErr);
        }

        res.status(200).json({ message: "Password reset successful! You can now login." });
      });
    });
  });
};
