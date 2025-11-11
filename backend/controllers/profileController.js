// GET profile
import db from  "../config/db.js"
import dotenv from 'dotenv';

dotenv.config();
router.get('/api/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM user_profiles WHERE user_id = ?',
      [req.params.userId]
    );
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE profile
router.put('/api/profile/:userId', authenticateToken, async (req, res) => {
  const { full_name, phone, location, bio, profile_image, preferred_language } = req.body;
  
  try {
    await db.query(
      `INSERT INTO user_profiles (user_id, full_name, phone, location, bio, profile_image, preferred_language)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       full_name = VALUES(full_name),
       phone = VALUES(phone),
       location = VALUES(location),
       bio = VALUES(bio),
       profile_image = VALUES(profile_image),
       preferred_language = VALUES(preferred_language)`,
      [req.params.userId, full_name, phone, location, bio, profile_image, preferred_language]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
