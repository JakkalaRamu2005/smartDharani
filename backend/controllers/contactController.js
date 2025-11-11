import db from "../config/db.js"
import dotenv from 'dotenv'

dotenv.config();


export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Consistent validation - phone is optional
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Name, email, subject, and message are required' 
      });
    }

    await db.execute(
      `INSERT INTO contact_submissions (name, email, phone, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || null, subject, message]
    );

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      success: true 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error while submitting form' });
  }
};

export const getAllContactSubmissions = async (req, res) => {
  try {
    const [submissions] = await db.execute(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error while fetching submissions' });
  }
};

export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.execute(
      'UPDATE contact_submissions SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({ 
      message: 'Status updated successfully',
      success: true 
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};

