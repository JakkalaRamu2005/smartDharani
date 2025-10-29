import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// router.post("/register", registerUser);
router.post("/register", (req, res) => {
  console.log("✅ Register route hit!");
  console.log("Body received:", req.body);
});

router.post("/login", loginUser);

export default router;
