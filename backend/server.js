import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import './config/db.js';
import passwordResetRoutes from './routes/passwordResetRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dharaniRoutes from './routes/dharaniRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { socketHandler } from './socketHandler.js';
import postRoutes from './routes/postRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

// NEW IMPORTS
import notificationRoutes from './routes/notificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  },
});

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Existing Routes
app.use('/api', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dharani', dharaniRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stats', statsRoutes);

// NEW ROUTES
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);

// Socket.io Setup
socketHandler(io);

// Base route
app.get('/', (req, res) => {
  res.send('Server is running smoothly');
});

// Start the server
const PORT = process.env.PORT || 9291;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
