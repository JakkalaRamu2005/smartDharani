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
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoute.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ ADD THIS LINE - Important for cookies!
app.set('trust proxy', 1);

// CORS Configuration
app.use(cors());


app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/dharani', dharaniRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🌾 Server is running smoothly');
});

const PORT = process.env.PORT || 9291;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
