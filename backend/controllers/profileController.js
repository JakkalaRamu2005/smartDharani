import db from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

// GET profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log('📋 Fetching profile for userId:', userId); // Debug log

    const [rows] = await db.execute(
      'SELECT * FROM user_profiles WHERE user_id = ?',
      [userId]
    );

    // ✅ FIX: Handle both cases properly
    if (rows.length === 0) {
      console.log('⚠️ No profile found, returning empty profile');
      return res.json({
        user_id: userId,
        full_name: null,
        phone: null,
        location: null,
        bio: null,
        profile_image: null,
        preferred_language: 'english'
      });
    }

    // ✅ FIX: Return the profile when it exists
    // console.log('✅ Profile found:', rows[0]);
    return res.json(rows[0]);

  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    const { full_name, phone, location, bio, profile_image, preferred_language } = req.body;

    // console.log('📝 Updating profile for userId:', userId); // Debug log

    const [existing] = await db.execute(
      'SELECT * FROM user_profiles WHERE user_id = ?',
      [userId]
    );

    if (existing.length === 0) {
      // Create new profile
      console.log('➕ Creating new profile');
      await db.execute(
        `INSERT INTO user_profiles 
        (user_id, full_name, phone, location, bio, profile_image, preferred_language)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, full_name, phone, location, bio, profile_image, preferred_language || 'english']
      );
    } else {
      // Update existing profile
      // console.log('🔄 Updating existing profile');

      // ✅ FIX: Corrected typo and added userId at the end
      await db.execute(
        `UPDATE user_profiles 
        SET full_name = ?, phone = ?, location = ?, bio = ?, 
            profile_image = ?, preferred_language = ?
        WHERE user_id = ?`,
        [full_name, phone, location, bio, profile_image, preferred_language || 'english', userId]
      );
    }

    // console.log('✅ Profile updated successfully');
    res.json({
      message: 'Profile updated successfully',
      success: true
    });

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({
      message: 'Server error while updating profile',
      error: error.message,
      sqlMessage: error.sqlMessage
    });
  }
};
