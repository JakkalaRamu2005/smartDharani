import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = (req, res) => {
  console.log(req.body);
  const { email, password, confirmPassword } = req.body;

  // Step 1: Check all fields
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 2: Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Step 3: Hash the password (never store plain passwords)
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Step 4: Insert user into database
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, hashedPassword], (err) => {
    if (err) {
      console.error("Database error during registration:", err);
      
      // Check for duplicate email
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      return res.status(500).json({ message: "Error saving user. Please try again." });
    }
    res.status(200).json({ message: "User registered successfully!" });
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

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: false, // ❗ must be false so frontend (js-cookie) can read it
      secure: false, // true if you're using https
      sameSite: "Lax", // "None" if you need cross-domain cookies
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", token, userId: user.id });
  });
};