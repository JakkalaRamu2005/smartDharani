import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('🔍 AuthContext: Checking authentication...');
    
    const token = Cookies.get('token');
    const storedUserId = Cookies.get('userId');
    const storedUsername = Cookies.get('username');

   

    if (token && storedUserId) {
      
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUser({ username: storedUsername });
    } else {
      // console.log('❌ User is NOT authenticated');
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  }, []);

  const login = (token, userIdFromServer, username) => {
   
    
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('userId', userIdFromServer, { expires: 7 });
    Cookies.set('username', username, { expires: 7 });
    
    setIsAuthenticated(true);
    setUserId(userIdFromServer);
    setUser({ username });
    
    // console.log('✅ Login successful - cookies set');
  };

  const logout = () => {
    // console.log('🚪 Logout called');
    
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('username');
    
    setIsAuthenticated(false);
    setUser(null);
    setUserId(null);
    
    // console.log('✅ Logout successful - cookies cleared');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
