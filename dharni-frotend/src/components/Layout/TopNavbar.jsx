import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from '../utils/ThemeToggle';
import './styles/TopNavbar.css';

const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const hamburger = document.querySelector('.hamburger-button');
        if (hamburger && !hamburger.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation - Esc to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="top-navbar">
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        className="hamburger-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Desktop Navigation */}
      <div className="navbar-links desktop-nav">
        <ThemeToggle />



        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button
            className="navbar-link profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Profile menu"
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            <span className="navbar-icon" aria-hidden="true">👤</span>
            <span className="navbar-text">Profile</span>
          </button>

          {showDropdown && (
            <div className="profile-dropdown" role="menu" aria-label="Profile options">
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setShowDropdown(false)}
                role="menuitem"
              >
                <span className="dropdown-icon" aria-hidden="true">👁️</span>
                View Profile
              </Link>

              <Link
                to="/edit-profile"
                className="dropdown-item"
                onClick={() => setShowDropdown(false)}
                role="menuitem"
              >
                <span className="dropdown-icon" aria-hidden="true">✏️</span>
                Edit Profile
              </Link>

              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
                role="menuitem"
              >
                <span className="dropdown-icon" aria-hidden="true">🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-header">
          <h2>Menu</h2>
          <button
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-links">
          {/* Theme Toggle for Mobile */}
          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>


          <div className="mobile-nav-divider"></div>

          <Link
            to="/profile"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <span className="navbar-icon" aria-hidden="true">👁️</span>
            View Profile
          </Link>

          <Link
            to="/edit-profile"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <span className="navbar-icon" aria-hidden="true">✏️</span>
            Edit Profile
          </Link>

          <button
            className="mobile-nav-link logout-btn"
            onClick={handleLogout}
          >
            <span className="navbar-icon" aria-hidden="true">🚪</span>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
