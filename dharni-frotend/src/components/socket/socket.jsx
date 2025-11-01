import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:9291';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true
});

export const connectSocket = (userId) => {
  if (userId && !socket.connected) {
    socket.connect();
    socket.emit('user_login', userId);
    console.log('✅ Socket connected for user:', userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.emit('user_logout');
    socket.disconnect();
    console.log('🔴 Socket disconnected');
  }
};
