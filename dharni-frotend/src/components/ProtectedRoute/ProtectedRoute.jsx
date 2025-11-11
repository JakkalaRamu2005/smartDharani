import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  // const token = Cookies.get("token"); // read token from cookie
  const {isAuthenticated} = useContext(AuthContext);
  



  if (!isAuthenticated) {
    // if cookie not found, send user to login
    return <Navigate to="/login" replace />;
  }

  // if cookie found, allow access
  return <Outlet/>;
}

export default ProtectedRoute;
