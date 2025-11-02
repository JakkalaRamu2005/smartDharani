import { updateOnlineStatus } from './controllers/profileController.js';
import db from './config/db.js';

// Keep track of active users
const activeUsers = new Set();

// Function to get total user count
const getTotalUsers = (callback) => {
  const sql = 'SELECT COUNT(*) AS total FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting total users:', err);
      callback(0);
    } else {
      callback(results[0].total);
    }
  });
};

// Function to broadcast user count
const broadcastUserCount = (io) => {
  getTotalUsers((totalUsers) => {
    io.emit('active_user_count', {
      onlineUsers: activeUsers.size,
      totalUsers: totalUsers
    });
  });
};

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 New user connected:', socket.id);

    // When user logs in → mark as online
    socket.on('user_login', (userId) => {
      if (!userId) return;
      socket.userId = userId;

      // Add to active users set
      activeUsers.add(userId);
      
      updateOnlineStatus(userId, true);
      console.log(`✅ User ${userId} is now online`);

      // Broadcast updated user count
      broadcastUserCount(io);

      // Notify all clients
      io.emit('user_online', { userId, isOnline: true });
    });

    // Optional: manual logout event
    socket.on('user_logout', () => {
      if (socket.userId) {
        activeUsers.delete(socket.userId);
        updateOnlineStatus(socket.userId, false);
        
        // Broadcast updated user count
        broadcastUserCount(io);
        
        io.emit('user_offline', { userId: socket.userId, isOnline: false });
        console.log(`🔵 User ${socket.userId} logged out`);
      }
    });

    // When disconnected (tab closed, network lost, etc.)
    socket.on('disconnect', () => {
      if (socket.userId) {
        activeUsers.delete(socket.userId);
        updateOnlineStatus(socket.userId, false);
        
        // Broadcast updated user count
        broadcastUserCount(io);
        
        io.emit('user_offline', { userId: socket.userId, isOnline: false });
        console.log(`🔴 User ${socket.userId} disconnected`);
      } else {
        console.log('Socket disconnected:', socket.id);
      }
    });
  });
};
