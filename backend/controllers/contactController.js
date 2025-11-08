import db from "../config/db.js"
import dotenv from 'dotenv'

dotenv.config();

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.warn('  Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields (name, email, subject, message)'
      });
    }

    console.log('Submitting contact form from:', name, email);

    // Insert into database
    const [result] = await db.query(
      `INSERT INTO contact_submissions 
       (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || null, subject, message]
    );

    console.log('Contact form submitted successfully with ID:', result.insertId);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
      data: {
        id: result.insertId
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit your message. Please try again.',
      error: error.message
    });
  }
};

// Get all contact submissions (for admin panel)
export const getAllContactSubmissions = async (req, res) => {
  try {
    const [submissions] = await db.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error(' Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};

// Update submission status
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'new', 'in-progress', 'resolved'

    const [result] = await db.query(
      'UPDATE contact_submissions SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully'
    });
  } catch (error) {
    console.error(' Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
};
