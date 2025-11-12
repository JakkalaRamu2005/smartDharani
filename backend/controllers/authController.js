
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../config/db.js"


export const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // checking for the existing user
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email =?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "user already exits" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hashedPassword]);

        res.status(201).json({ message: "user registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error during registration" });
    }
}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const [userResult] = await db.execute("SELECT * FROM users WHERE email =?", [email]);

        if (userResult.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });

        }

        const user = userResult[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })


        res.status(200).json({
            message: "Login successfull", token, userId: user.id, username: user.username, email: user.email
        });


    } catch (error) {
        console.error('Login error', error);
        res.status(500).json({ message: "server error during the login" });
    }



}


export const logoutUser = (req, res) => {
    res.clearCookie('token');

    res.status(200).json({ message: "logged out successfully" });
}

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.status(200).json({ 
      valid: true, 
      userId: decoded.userId,
      email: decoded.email
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
