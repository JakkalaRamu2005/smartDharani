import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './styles/profileMenu.css';

const ProfileMenu = ({ onClose }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-menu">
      <button className="profile-menu-item" onClick={() => handleNavigation('/profile')}>
        <span className="menu-icon">👤</span>
        <span>Profile</span>
      </button>
      <button className="profile-menu-item" onClick={() => handleNavigation('/settings')}>
        <span className="menu-icon">⚙️</span>
        <span>Settings</span>
      </button>
      <button className="profile-menu-item logout" onClick={handleLogout}>
        <span className="menu-icon">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
