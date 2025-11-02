import db from '../config/db.js';

// Get notification count for a user
export const getNotificationCount = (req, res) => {
  const userId = req.params.userId;

  const sql = `SELECT COUNT(*) AS count FROM notifications WHERE userid = ? AND isread = FALSE`;
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching notification count:', err);
      return res.status(500).json({ message: 'Error fetching notifications' });
    }

    res.status(200).json({ success: true, count: results[0].count });
  });
};

// Mark notifications as read
export const markNotificationsRead = (req, res) => {
  const userId = req.params.userId;

  const sql = `UPDATE notifications SET isread = TRUE WHERE userid = ?`;
  
  db.query(sql, [userId], (err) => {
    if (err) {
      console.error('Error marking notifications as read:', err);
      return res.status(500).json({ message: 'Error updating notifications' });
    }

    res.status(200).json({ success: true, message: 'Notifications marked as read' });
  });
};
