import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './styles/TopNavbar.css';

const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowDropdown(false);
  };

  return (
    <div className="top-navbar">
      <div className="navbar-links">
        <Link to="/contact" className="navbar-link">
          <span className="navbar-icon">📞</span>
          <span className="navbar-text">Contact</span>
        </Link>
        
        <Link to="/about" className="navbar-link">
          <span className="navbar-icon">ℹ️</span>
          <span className="navbar-text">About</span>
        </Link>
        
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button 
            className="navbar-link profile-button" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="navbar-icon">👤</span>
            <span className="navbar-text">Profile</span>
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <Link 
                to="/profile" 
                className="dropdown-item"
                onClick={() => setShowDropdown(false)}
              >
                <span className="dropdown-icon">👁️</span>
                View Profile
              </Link>
              
              <Link 
                to="/edit-profile" 
                className="dropdown-item"
                onClick={() => setShowDropdown(false)}
              >
                <span className="dropdown-icon">✏️</span>
                Edit Profile
              </Link>
              
              <button 
                className="dropdown-item logout-btn" 
                onClick={handleLogout}
              >
                <span className="dropdown-icon">🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
