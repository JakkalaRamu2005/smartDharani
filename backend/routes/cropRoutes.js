import express from 'express';
import { getCropRecommendations, testGeminiConnection } from '../controllers/cropController.js';

const router = express.Router();

// POST route for crop recommendations
router.post('/recommendations', getCropRecommendations);

// GET route to test Gemini AI connection
router.get('/test-connection', testGeminiConnection);

export default router;
