// socket/socketHandler.js
import { updateOnlineStatus } from './controllers/profileController.js';

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 New user connected:', socket.id);

    // 🟩 When user logs in → mark as online
    socket.on('user_login', (userId) => {
      if (!userId) return;
      socket.userId = userId;

      updateOnlineStatus(userId, true);
      console.log(`✅ User ${userId} is now online`);

      // Notify all clients
      io.emit('user_online', { userId, isOnline: true });
    });

    // 🟦 Optional: manual logout event
    socket.on('user_logout', () => {
      if (socket.userId) {
        updateOnlineStatus(socket.userId, false);
        io.emit('user_offline', { userId: socket.userId, isOnline: false });
        console.log(`🔵 User ${socket.userId} logged out`);
      }
    });

    // 🔴 When disconnected (tab closed, network lost, etc.)
    socket.on('disconnect', () => {
      if (socket.userId) {
        updateOnlineStatus(socket.userId, false);
        io.emit('user_offline', { userId: socket.userId, isOnline: false });
        console.log(`🔴 User ${socket.userId} disconnected`);
      } else {
        console.log('Socket disconnected:', socket.id);
      }
    });
  });
};
