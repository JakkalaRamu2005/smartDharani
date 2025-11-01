import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { connectSocket, disconnectSocket } from "../socket/socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      connectSocket(storedUserId);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token, userIdFromServer) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("userId", userIdFromServer, { expires: 7 });
    setIsAuthenticated(true);
    setUserId(userIdFromServer);
    connectSocket(userIdFromServer);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
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
