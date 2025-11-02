import db from '../config/db.js';

export const search = (req, res) => {
  const query = req.query.q;

  if (!query || query.length < 2) {
    return res.status(400).json({ message: 'Search query must be at least 2 characters' });
  }

  const searchTerm = `%${query}%`;

  // ✅ FIX: Use correct column names with underscores
  const postsSql = `
    SELECT 
      p.*, 
      u.email, 
      u.username,
      up.profile_photo AS profilephoto, 
      up.role, 
      up.location,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likecount,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS commentcount,
      (SELECT COUNT(*) FROM shares WHERE post_id = p.id) AS sharecount
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN user_profiles up ON u.id = up.user_id
    WHERE p.content LIKE ?
    ORDER BY p.created_at DESC
    LIMIT 20
  `;

  // ✅ FIX: Use correct column names with underscores
  const usersSql = `
    SELECT 
      u.id, 
      u.email, 
      u.username,
      up.profile_photo AS profilephoto, 
      up.role, 
      up.location
    FROM users u
    LEFT JOIN user_profiles up ON u.id = up.user_id
    WHERE u.email LIKE ? OR u.username LIKE ? OR up.location LIKE ? OR up.role LIKE ?
    LIMIT 20
  `;

  db.query(postsSql, [searchTerm], (err, posts) => {
    if (err) {
      console.error('Error searching posts:', err);
      return res.status(500).json({ message: 'Error searching posts', error: err.message });
    }

    db.query(usersSql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, users) => {
      if (err) {
        console.error('Error searching users:', err);
        return res.status(500).json({ message: 'Error searching users', error: err.message });
      }

      res.status(200).json({
        success: true,
        posts: posts || [],
        users: users || []
      });
    });
  });
};
