import { updateOnlineStatus } from './controllers/profileController.js';
import db from './config/db.js';

const activeUsers = new Set();

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

const broadcastUserCount = (io) => {
  getTotalUsers((totalUsers) => {
    io.emit('activeusercount', {
      onlineUsers: activeUsers.size,
      totalUsers: totalUsers
    });
  });
};

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('userlogin', (userId) => {
      if (!userId) return;
      socket.userId = userId;
      activeUsers.add(userId);
      updateOnlineStatus(userId, true);
      broadcastUserCount(io);
      io.emit('useronline', { userId, isOnline: true });
    });

    // NEW: Handle sending notifications
    socket.on('send_notification', (data) => {
      io.to(data.receiverId).emit('notification', {
        userId: data.receiverId,
        message: data.message,
        type: data.type
      });
    });

    // NEW: Handle sending messages
    socket.on('send_message', (data) => {
      io.to(data.receiverId).emit('new_message', {
        receiverId: data.receiverId,
        senderId: data.senderId,
        content: data.content
      });
    });

    socket.on('userlogout', () => {
      if (socket.userId) {
        activeUsers.delete(socket.userId);
        updateOnlineStatus(socket.userId, false);
        broadcastUserCount(io);
        io.emit('useroffline', { userId: socket.userId, isOnline: false });
      }
    });

    socket.on('disconnect', () => {
      if (socket.userId) {
        activeUsers.delete(socket.userId);
        updateOnlineStatus(socket.userId, false);
        broadcastUserCount(io);
        io.emit('useroffline', { userId: socket.userId, isOnline: false });
      } else {
        console.log('Socket disconnected:', socket.id);
      }
    });
  });
};
