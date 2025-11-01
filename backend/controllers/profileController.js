// backend/controllers/profileController.js
import db from '../config/db.js';

// ❌ OLD CODE (looking in users table only):
// const query = 'SELECT * FROM users WHERE id = ?';

// ✅ NEW CODE (join both tables):
export const getProfile = (req, res) => {
  const userId = req.params.id;
  
  console.log('📥 Fetching profile for user ID:', userId);
  
  // Join users and user_profiles tables
  const query = `
    SELECT 
      u.id, 
      u.email, 
      u.created_at,
      p.role, 
      p.location, 
      p.qualification, 
      p.passion, 
      p.crops, 
      p.farm_size, 
      p.experience, 
      p.languages, 
      p.about, 
      p.social_links, 
      p.profile_photo, 
      p.is_online, 
      p.last_seen
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.id = ?
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (results.length === 0) {
      console.log('⚠️ User not found with ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = results[0];
    
    console.log('✅ Profile fetched successfully');
    res.status(200).json({ success: true, user });
  });
};

// Update profile - also needs to update user_profiles table
export const updateProfile = (req, res) => {
  const userId = req.params.id;
  const {
    role,
    location,
    qualification,
    passion,
    crops,
    farm_size,
    experience,
    languages,
    about,
    social_links,
    profile_photo
  } = req.body;
  
  console.log('📝 Updating profile for user ID:', userId);
  
  // Check if profile exists first
  const checkQuery = 'SELECT id FROM user_profiles WHERE user_id = ?';
  
  db.query(checkQuery, [userId], (err, results) => {
    if (err) {
      console.error('❌ Error checking profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const socialLinksString = typeof social_links === 'object' 
      ? JSON.stringify(social_links) 
      : social_links;
    
    if (results.length === 0) {
      // Profile doesn't exist - INSERT new profile
      const insertQuery = `
        INSERT INTO user_profiles 
        (user_id, role, location, qualification, passion, crops, farm_size, 
         experience, languages, about, social_links, profile_photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.query(
        insertQuery,
        [userId, role, location, qualification, passion, crops, farm_size, 
         experience, languages, about, socialLinksString, profile_photo],
        (err) => {
          if (err) {
            console.error('❌ Insert failed:', err);
            return res.status(500).json({ error: 'Failed to create profile' });
          }
          
          console.log('✅ Profile created successfully');
          res.status(200).json({ success: true, message: 'Profile created successfully' });
        }
      );
    } else {
      // Profile exists - UPDATE existing profile
      const updateQuery = `
        UPDATE user_profiles 
        SET 
          role = ?,
          location = ?,
          qualification = ?,
          passion = ?,
          crops = ?,
          farm_size = ?,
          experience = ?,
          languages = ?,
          about = ?,
          social_links = ?,
          profile_photo = ?
        WHERE user_id = ?
      `;
      
      db.query(
        updateQuery,
        [role, location, qualification, passion, crops, farm_size, 
         experience, languages, about, socialLinksString, profile_photo, userId],
        (err) => {
          if (err) {
            console.error('❌ Update failed:', err);
            return res.status(500).json({ error: 'Update failed' });
          }
          
          console.log('✅ Profile updated successfully');
          res.status(200).json({ success: true, message: 'Profile updated successfully' });
        }
      );
    }
  });
};

// Update online status in user_profiles table
export const updateOnlineStatus = (userId, isOnline) => {
  const query = isOnline 
    ? 'UPDATE user_profiles SET is_online = TRUE WHERE user_id = ?'
    : 'UPDATE user_profiles SET is_online = FALSE, last_seen = NOW() WHERE user_id = ?';
  
  db.query(query, [userId], (err) => {
    if (err) {
      console.error('❌ Error updating online status:', err);
    } else {
      console.log(`✅ User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
    }
  });
};
