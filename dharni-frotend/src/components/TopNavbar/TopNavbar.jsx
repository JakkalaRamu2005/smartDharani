import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { socket } from '../socket/socket';
import { AiOutlineHome, AiOutlineBell, AiOutlineMessage } from 'react-icons/ai';
import SearchBar from './SearchBar';
import ProfileDropdown from './ProfileDropdown';
import styles from './TopNavbar.module.css';

export default function TopNavbar() {
  const { userId, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch initial notification and message counts
  useEffect(() => {
    if (userId) {
      fetchNotificationCount();
      fetchMessageCount();
    }
  }, [userId]);

  // Listen for real-time updates
  useEffect(() => {
    socket.on('notification', (data) => {
      if (data.userId === userId) {
        setNotificationCount(prev => prev + 1);
      }
    });

    socket.on('new_message', (data) => {
      if (data.receiverId === userId) {
        setMessageCount(prev => prev + 1);
      }
    });

    return () => {
      socket.off('notification');
      socket.off('new_message');
    };
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch(`http://localhost:9291/api/notifications/count/${userId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setNotificationCount(data.count || 0);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const fetchMessageCount = async () => {
    try {
      const response = await fetch(`http://localhost:9291/api/messages/unread/${userId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setMessageCount(data.count || 0);
    } catch (error) {
      console.error('Error fetching message count:', error);
    }
  };

  const handleHomeClick = () => {
    navigate('/feed');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate('/feed')}>
          <span className={styles.logoIcon}>🌱</span>
          <span className={styles.logoText}>Smart Dharani</span>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Right Side Icons */}
        <div className={styles.navIcons}>
          {/* Home Icon */}
          <div className={styles.iconWrapper} onClick={handleHomeClick} title="Home">
            <AiOutlineHome className={styles.icon} />
          </div>

          {/* Notifications Icon */}
          <div className={styles.iconWrapper} title="Notifications">
            <AiOutlineBell className={styles.icon} />
            {notificationCount > 0 && (
              <span className={styles.badge}>{notificationCount > 99 ? '99+' : notificationCount}</span>
            )}
          </div>

          {/* Messaging Icon */}
          <div className={styles.iconWrapper} title="Messages">
            <AiOutlineMessage className={styles.icon} />
            {messageCount > 0 && (
              <span className={styles.badge}>{messageCount > 99 ? '99+' : messageCount}</span>
            )}
          </div>

          {/* Profile Picture */}
          <div className={styles.profileWrapper} onClick={handleProfileClick} ref={dropdownRef}>
            <div className={styles.profileInfo}>
              {console.log(user.email)}
              <span className={styles.username}>{user?.username || user?.email}</span>
              <img
                src={user?.profilephoto || 'default-avatar.png'}
                alt={user?.username || 'User'}
                className={styles.profilePic}
              />
            </div>
            {showProfileMenu && <ProfileDropdown onClose={() => setShowProfileMenu(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
