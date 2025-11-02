// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


import "./config/db.js"; // database connection

import passwordResetRoutes from "./routes/passwordResetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dharaniRoutes from "./routes/dharaniRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { socketHandler } from "./socketHandler.js"; // your socket logic
import postRoutes from './routes/postRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();

// ✅ Create HTTP server for both API + WebSocket
const server = http.createServer(app);

// ✅ Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React frontend URL
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dharani", dharaniRoutes);


// Add this route with your other routes
app.use("/api/auth", passwordResetRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stats', statsRoutes);


// ✅ Socket.io Setup
socketHandler(io);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("🚀 Server is running smoothly...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
