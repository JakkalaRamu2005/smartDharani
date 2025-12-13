import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon">🌾</span>
        <h2 className="logo-text">Smart Dharani</h2>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </Link>

        <Link to="/crop-selection" className="nav-item">
          <span className="nav-icon">🌱</span>
          <span className="nav-text">Crop Selection</span>
        </Link>

        <Link to="/farming-guides" className="nav-item">
          <span className="nav-icon">📖</span>
          <span className="nav-text">Farming Guides</span>
        </Link>

        <Link to="/issue-diagnosis" className="nav-item">
          <span className="nav-icon">🔍</span>
          <span className="nav-text">Issue Diagnosis</span>
        </Link>

        <Link to="/marketplace" className="nav-item">
          <span className="nav-icon">🛒</span>
          <span className="nav-text">Marketplace</span>
        </Link>

        <Link to="/profile" className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">© 2025 Smart Dharani</p>
      </div>
    </div >
  );
};

export default Sidebar;
