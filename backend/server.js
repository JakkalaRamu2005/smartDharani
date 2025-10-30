import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dharaniRoutes from "./routes/dharaniRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());




app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your React frontend URL
  credentials: true, // allow sending cookies
}));


app.use("/api/dharani", dharaniRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
