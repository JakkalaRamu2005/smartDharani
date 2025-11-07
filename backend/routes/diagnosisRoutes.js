import express from 'express';
import { diagnoseCropIssue } from '../controllers/diagnosisController.js';

const router = express.Router();

// POST route for crop diagnosis
router.post('/diagnose', diagnoseCropIssue);

export default router;
