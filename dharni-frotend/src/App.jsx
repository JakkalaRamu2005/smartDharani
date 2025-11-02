import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar'; // Your existing sidebar
import TopNavbar from './components/TopNavbar/TopNavbar'; // New top navbar
import ProfileView from './components/Profile/ProfileView';
import ProfileEdit from './components/Profile/ProfileEdit';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SearchPage from './components/Search/SearchPage'; // You'll create this

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes - No Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes - With BOTH Top Navbar AND Sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Navbar />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Navbar />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed/search"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Navbar />
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Navbar />
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Navbar />
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
