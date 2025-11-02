import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { connectSocket, disconnectSocket } from '../socket/socket';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUserId = Cookies.get('userId');
    const storedUsername = Cookies.get('username'); // NEW

    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      
      // Set initial user data with username
      setUser({ username: storedUsername });
      
      connectSocket(storedUserId);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token, userIdFromServer, username) => { // Add username parameter
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('userId', userIdFromServer, { expires: 7 });
    Cookies.set('username', username, { expires: 7 }); // NEW: Store username
    
    setIsAuthenticated(true);
    setUserId(userIdFromServer);
    setUser({ username }); // Set username in context
    
    connectSocket(userIdFromServer);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('username'); // NEW: Remove username
    
    setIsAuthenticated(false);
    setUser(null);
    setUserId(null);
    
    disconnectSocket();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
