import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../context/AuthContext';
import ProfileWidget from '../Profile/ProfileWidget';
import { getProfile } from '../utils/api';
import { socket } from '../socket/socket';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId && !user) {
      fetchUserProfile();
    }

    // Listen for real-time online/offline updates
    socket.on('user_online', (data) => {
      if (data.userId === userId) {
        setUser(prev => ({ ...prev, is_online: true }));
      }
    });

    socket.on('user_offline', (data) => {
      if (data.userId === userId) {
        setUser(prev => ({ ...prev, is_online: false }));
      }
    });

    return () => {
      socket.off('user_online');
      socket.off('user_offline');
    };
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const data = await getProfile(userId);
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">Smart Dharani</span>
          </Link>

          {/* Navigation Links */}
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </Link>
            </li>
           
          </ul>

           <ProfileWidget user={user} />

          {/* CTA Button */}
          
        </div>

        {/* Hamburger Menu - Mobile Only */}
        <button className="nav-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </nav>

      {/* Profile Widget at Bottom */}
     
    </>
  );
}
