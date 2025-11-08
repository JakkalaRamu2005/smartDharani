import express from 'express';
import {
  submitContactForm,
  getAllContactSubmissions,
  updateSubmissionStatus
} from '../controllers/contactController.js';

const router = express.Router();

// POST - Submit contact form
router.post('/submit', submitContactForm);

// GET - Get all submissions (admin)
router.get('/submissions', getAllContactSubmissions);

// PATCH - Update submission status (admin)
router.patch('/submissions/:id/status', updateSubmissionStatus);

export default router;
