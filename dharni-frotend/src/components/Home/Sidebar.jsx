import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./styles/sidebar.css"

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-header">
        <span className="logo-icon">🌾</span>
        <h2 className="logo-text">Smart Dharani</h2>
      </Link>

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

      <div className="sidebar-bottom">
        <button className="nav-item logout-button" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
        <div className="sidebar-footer">
          <p className="footer-text">© 2025 Smart Dharani</p>
        </div>
      </div>
    </div >
  );
};

export default Sidebar;
