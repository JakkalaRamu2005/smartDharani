import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import About from './components/About/About';
import Layout from './components/Layout/Layout';
import IssueDiagnosis from './components/IssueDiagnosis/IssueDiagnosis';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CropSelection from './components/CropSelection/CropSelection';
import FarmingGuides from './components/FarmingGuides/FarmingGuides';
import Marketplace from './components/Marketplace/Marketplace';
import Contact from './components/Contact/Contact.jsx';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import Chatbot from './components/Chatbot/Chatbot';
import ErrorBoundary from './components/utils/ErrorBoundary';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const location = useLocation();

  // Pages where chatbot should NOT appear
  const excludedPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

  // Check if current path should show chatbot
  const shouldShowChatbot = !excludedPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Skip navigation for keyboard accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        <Routes>
          {/* Public Routes - No Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/crop-selection" element={<CropSelection />} />
              <Route path="/about" element={<About />} />
              <Route path="/issue-diagnosis" element={<IssueDiagnosis />} />
              <Route path="/farming-guides" element={<FarmingGuides />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path='/contact' element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
          </Route>

          {/* 404 Not Found - Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Conditionally render chatbot */}
        {shouldShowChatbot && <Chatbot />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
