


import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;

  // Step 1: Validate all fields
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 2: Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Step 3: Validate username (optional - only letters, numbers, underscores)
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: "Username must be 3-20 characters (letters, numbers, underscores only).",
    });
  }

  // Step 4: Check if username or email already exists
  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error. Try again." });
    }

    if (results.length > 0) {
      const existingUser = results[0];
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists." });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken." });
      }
    }

    // Step 5: Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Step 6: Insert user into database
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error("Database error during registration:", err);
        return res.status(500).json({ message: "Error saving user. Try again." });
      }

      res.status(200).json({ message: "✅ Registration successful!" });
    });
  });
};





export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: false, // ❗ must be false so frontend (js-cookie) can read it
      secure: false, // true if you're using https
      sameSite: "Lax", // "None" if you need cross-domain cookies
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

 

    res.status(200).json({ message: "Login successful", token, userId: user.id, username: user.username});
  });
};