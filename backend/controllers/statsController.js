import db from '../config/db.js';

// Keep track of online users (you can also use Redis for production)
let onlineUsersCount = 0;

export const setOnlineUsersCount = (count) => {
  onlineUsersCount = count;
};

export const getOnlineUsers = (req, res) => {
  const totalUsersSql = 'SELECT COUNT(*) AS total FROM users';
  
  db.query(totalUsersSql, (err, results) => {
    if (err) {
      console.error('Error fetching user stats:', err);
      return res.status(500).json({ message: 'Error fetching stats' });
    }
    
    res.status(200).json({
      totalUsers: results[0].total,
      onlineUsers: onlineUsersCount
    });
  });
};
