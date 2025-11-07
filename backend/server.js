import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';

import './config/db.js';
import passwordResetRoutes from './routes/passwordResetRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dharaniRoutes from './routes/dharaniRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
dotenv.config();
const app = express();
const server = http.createServer(app);


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Routes
app.use('/api/crop', cropRoutes);
app.use('/api/diagnosis', diagnosisRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/dharani', dharaniRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Server is running smoothly');
});

// Start the server
const PORT = process.env.PORT || 9291;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
