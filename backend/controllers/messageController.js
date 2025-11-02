import db from '../config/db.js';

// Get unread message count for a user
export const getUnreadMessageCount = (req, res) => {
  const userId = req.params.userId;

  const sql = `SELECT COUNT(*) AS count FROM messages WHERE receiverid = ? AND isread = FALSE`;
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching message count:', err);
      return res.status(500).json({ message: 'Error fetching messages' });
    }

    res.status(200).json({ success: true, count: results[0].count });
  });
};
