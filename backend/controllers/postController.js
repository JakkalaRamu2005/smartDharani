import db from '../config/db.js';

// Get all posts - Fixed column names
export const getAllPosts = (req, res) => {
  // ✅ FIX: Use correct column names with underscores
  const sql = `
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
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ message: 'Error fetching posts' });
    }

    res.status(200).json({ success: true, posts: results });
  });
};

// Get user posts - Fixed column names
export const getUserPosts = (req, res) => {
  const userId = req.params.userId;

  // ✅ FIX: Use correct column names with underscores
  const sql = `
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
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user posts:', err);
      return res.status(500).json({ message: 'Error fetching user posts' });
    }

    res.status(200).json({ success: true, posts: results });
  });
};

// Create post - Fixed column names
export const createPost = (req, res) => {
  const { userId, content, imageurl } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: 'User ID and content are required' });
  }

  // ✅ FIX: Use correct column names with underscores
  const sql = `INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)`;

  db.query(sql, [userId, content, imageurl], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).json({ message: 'Error creating post' });
    }

    res.status(201).json({ success: true, message: 'Post created successfully', postId: result.insertId });
  });
};

// Toggle like - Fixed column names
export const toggleLike = (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: 'Post ID and User ID are required' });
  }

  // ✅ FIX: Use correct column names with underscores
  const checkSql = `SELECT * FROM likes WHERE post_id = ? AND user_id = ?`;

  db.query(checkSql, [postId, userId], (err, results) => {
    if (err) {
      console.error('Error checking like:', err);
      return res.status(500).json({ message: 'Error checking like' });
    }

    if (results.length > 0) {
      // Unlike
      const deleteSql = `DELETE FROM likes WHERE post_id = ? AND user_id = ?`;
      db.query(deleteSql, [postId, userId], (err) => {
        if (err) {
          console.error('Error removing like:', err);
          return res.status(500).json({ message: 'Error removing like' });
        }
        res.status(200).json({ success: true, liked: false });
      });
    } else {
      // Like
      const insertSql = `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`;
      db.query(insertSql, [postId, userId], (err) => {
        if (err) {
          console.error('Error adding like:', err);
          return res.status(500).json({ message: 'Error adding like' });
        }
        res.status(200).json({ success: true, liked: true });
      });
    }
  });
};

// Get comments - Fixed column names
export const getComments = (req, res) => {
  const postId = req.params.id;

  // ✅ FIX: Use correct column names with underscores
  const sql = `
    SELECT 
      c.*, 
      u.email, 
      u.username,
      up.profile_photo AS profilephoto
    FROM comments c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN user_profiles up ON u.id = up.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC
  `;

  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).json({ message: 'Error fetching comments' });
    }

    res.status(200).json({ success: true, comments: results });
  });
};

// Add comment - Fixed column names
export const addComment = (req, res) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content) {
    return res.status(400).json({ message: 'Post ID, User ID, and content are required' });
  }

  // ✅ FIX: Use correct column names with underscores
  const sql = `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`;

  db.query(sql, [postId, userId, content], (err, result) => {
    if (err) {
      console.error('Error adding comment:', err);
      return res.status(500).json({ message: 'Error adding comment' });
    }

    res.status(201).json({ success: true, message: 'Comment added successfully', commentId: result.insertId });
  });
};

// Share post - Fixed column names
export const sharePost = (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: 'Post ID and User ID are required' });
  }

  // ✅ FIX: Use correct column names with underscores
  const sql = `INSERT INTO shares (post_id, user_id) VALUES (?, ?)`;

  db.query(sql, [postId, userId], (err, result) => {
    if (err) {
      console.error('Error sharing post:', err);
      return res.status(500).json({ message: 'Error sharing post' });
    }

    res.status(201).json({ success: true, message: 'Post shared successfully', shareId: result.insertId });
  });
};
