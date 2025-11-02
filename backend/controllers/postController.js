import db from '../config/db.js';

// Create a new post
export const createPost = (req, res) => {
  const { content, image_url } = req.body;
  const userId = req.body.userId; // You can also get this from JWT token

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  const sql = 'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)';
  
  db.query(sql, [userId, content, image_url || null], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).json({ message: 'Error creating post' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Post created successfully',
      postId: result.insertId
    });
  });
};

// Get all posts (with user info, profile photo, like count, comment count)
export const getAllPosts = (req, res) => {
  const sql = `
    SELECT 
      p.*,
      u.email,
      up.profile_photo,
      up.role,
      up.location,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count,
      (SELECT COUNT(*) FROM shares WHERE post_id = p.id) AS share_count
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

// Get posts by a specific user
export const getUserPosts = (req, res) => {
  const userId = req.params.userId;
  
  const sql = `
    SELECT 
      p.*,
      u.email,
      up.profile_photo,
      up.role,
      up.location,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count,
      (SELECT COUNT(*) FROM shares WHERE post_id = p.id) AS share_count
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

// Toggle like on a post (like if not liked, unlike if already liked)
export const toggleLike = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  
  // Check if user already liked this post
  const checkSql = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
  
  db.query(checkSql, [postId, userId], (err, results) => {
    if (err) {
      console.error('Error checking like:', err);
      return res.status(500).json({ message: 'Error checking like' });
    }
    
    if (results.length > 0) {
      // Already liked, so unlike it
      const deleteSql = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?';
      db.query(deleteSql, [postId, userId], (deleteErr) => {
        if (deleteErr) {
          console.error('Error unliking post:', deleteErr);
          return res.status(500).json({ message: 'Error unliking post' });
        }
        res.status(200).json({ success: true, message: 'Post unliked', liked: false });
      });
    } else {
      // Not liked yet, so like it
      const insertSql = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
      db.query(insertSql, [postId, userId], (insertErr) => {
        if (insertErr) {
          console.error('Error liking post:', insertErr);
          return res.status(500).json({ message: 'Error liking post' });
        }
        res.status(200).json({ success: true, message: 'Post liked', liked: true });
      });
    }
  });
};

// Add a comment to a post
export const addComment = (req, res) => {
  const postId = req.params.id;
  const { userId, content } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Comment content is required' });
  }
  
  const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
  
  db.query(sql, [postId, userId, content], (err, result) => {
    if (err) {
      console.error('Error adding comment:', err);
      return res.status(500).json({ message: 'Error adding comment' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Comment added successfully',
      commentId: result.insertId
    });
  });
};

// Get all comments for a specific post
export const getComments = (req, res) => {
  const postId = req.params.id;
  
  const sql = `
    SELECT 
      c.*,
      u.email,
      up.profile_photo
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

// Share a post
export const sharePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  
  const sql = 'INSERT INTO shares (post_id, user_id) VALUES (?, ?)';
  
  db.query(sql, [postId, userId], (err, result) => {
    if (err) {
      console.error('Error sharing post:', err);
      return res.status(500).json({ message: 'Error sharing post' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Post shared successfully',
      shareId: result.insertId
    });
  });
};
