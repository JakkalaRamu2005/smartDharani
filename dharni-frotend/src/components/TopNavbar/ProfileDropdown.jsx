import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './TopNavbar.module.css';

export default function ProfileDropdown({ onClose }) {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownItem}
        onClick={() => handleNavigation(`/profile`)}
      >
        <span className={styles.dropdownIcon}>👤</span>
        <span>View My Profile</span>
      </button>
      <button
        className={styles.dropdownItem}
        onClick={() => handleNavigation('/settings')}
      >
        <span className={styles.dropdownIcon}>⚙️</span>
        <span>Settings</span>
      </button>
      <div className={styles.dropdownDivider}></div>
      <button
        className={`${styles.dropdownItem} ${styles.logoutBtn}`}
        onClick={handleLogout}
      >
        <span className={styles.dropdownIcon}>🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
}
