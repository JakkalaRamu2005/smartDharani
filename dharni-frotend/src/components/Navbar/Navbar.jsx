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
   
   </>
  );
}
  