import React from 'react';
import { Link } from 'react-router-dom';
import './styles/TopNavbar.css';

const TopNavbar = () => {
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
        
        <Link to="/profile" className="navbar-link">
          <span className="navbar-icon">👤</span>
          <span className="navbar-text">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
