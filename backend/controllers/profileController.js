import db from '../config/db.js';

// Get Profile - Fixed column names to match your database schema
export const getProfile = (req, res) => {
  const userId = req.params.id;
  console.log('Fetching profile for user ID:', userId);

  // ✅ FIX: Use correct column names with underscores
  const query = `
    SELECT 
      u.id, 
      u.email, 
      u.username,
      u.created_at AS createdat,
      p.role, 
      p.location, 
      p.qualification, 
      p.passion, 
      p.crops, 
      p.farm_size AS farmsize, 
      p.experience, 
      p.languages, 
      p.about, 
      p.social_links AS sociallinks, 
      p.profile_photo AS profilephoto,
      p.is_online AS isonline,
      p.last_seen AS lastseen
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    if (results.length === 0) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    console.log('Profile fetched successfully');
    res.status(200).json({ success: true, user });
  });
};

// Update Profile - Fixed column names
export const updateProfile = (req, res) => {
  const userId = req.params.id;
  const { role, location, qualification, passion, crops, farmsize, experience, languages, about, sociallinks, profilephoto } = req.body;

  console.log('Updating profile for user ID:', userId);

  // ✅ FIX: Use correct table name with underscore
  const checkQuery = `SELECT id FROM user_profiles WHERE user_id = ?`;
  
  db.query(checkQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error checking profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const socialLinksString = typeof sociallinks === 'object' ? JSON.stringify(sociallinks) : sociallinks;

    if (results.length === 0) {
      // ✅ FIX: Use correct column names with underscores
      const insertQuery = `
        INSERT INTO user_profiles (user_id, role, location, qualification, passion, crops, farm_size, experience, languages, about, social_links, profile_photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.query(
        insertQuery,
        [userId, role, location, qualification, passion, crops, farmsize, experience, languages, about, socialLinksString, profilephoto],
        (err) => {
          if (err) {
            console.error('Insert failed:', err);
            return res.status(500).json({ error: 'Failed to create profile' });
          }
          console.log('Profile created successfully');
          res.status(200).json({ success: true, message: 'Profile created successfully' });
        }
      );
    } else {
      // ✅ FIX: Use correct column names with underscores
      const updateQuery = `
        UPDATE user_profiles 
        SET role = ?, location = ?, qualification = ?, passion = ?, crops = ?, farm_size = ?, experience = ?, languages = ?, about = ?, social_links = ?, profile_photo = ?
        WHERE user_id = ?
      `;
      
      db.query(
        updateQuery,
        [role, location, qualification, passion, crops, farmsize, experience, languages, about, socialLinksString, profilephoto, userId],
        (err) => {
          if (err) {
            console.error('Update failed:', err);
            return res.status(500).json({ error: 'Update failed' });
          }
          console.log('Profile updated successfully');
          res.status(200).json({ success: true, message: 'Profile updated successfully' });
        }
      );
    }
  });
};

// Update Online Status - Fixed column names
export const updateOnlineStatus = (userId, isOnline) => {
  // ✅ FIX: Use correct column names with underscores
  const query = isOnline
    ? `UPDATE user_profiles SET is_online = TRUE WHERE user_id = ?`
    : `UPDATE user_profiles SET is_online = FALSE, last_seen = NOW() WHERE user_id = ?`;

  db.query(query, [userId], (err) => {
    if (err) {
      console.error('Error updating online status:', err);
    } else {
      console.log(`User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
    }
  });
};
