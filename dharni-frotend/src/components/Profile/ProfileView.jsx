import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './styles/profileView.css';

import axios from 'axios';
import PostCard from '../Posts/PostCard';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9291/api/posts/user/${userId}`,
        { withCredentials: true }
      );
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const data = await getProfile(userId);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error-message">Profile not found</div>;
  }

  const socialLinks = typeof user.social_links === 'string'
    ? JSON.parse(user.social_links)
    : user.social_links || {};

  return (
    <div className="profile-view">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={user.profile_photo || '/default-avatar.png'}
          alt={user.name}
          className="profile-photo-large"
        />
        <div className="profile-header-info">
          <h1>{user.email || 'Anonymous'}</h1>
          <div className="online-status">
            <span className={`status-dot ${user.is_online ? 'online' : 'offline'}`}></span>
            <span>
              {user.is_online
                ? 'Online'
                : `Last seen: ${user.last_seen ? new Date(user.last_seen).toLocaleString() : 'N/A'}`}
            </span>
          </div>
        </div>
        <button className="edit-profile-btn" onClick={() => navigate('/settings')}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Basic Information */}
      <div className="profile-card">
        <h2>📋 Basic Information</h2>
        <div className="profile-info-row">
          <span className="info-label">💼 Role:</span>
          <span className="info-value">{user.role || 'Not specified'}</span>
        </div>
        <div className="profile-info-row">
          <span className="info-label">📍 Location:</span>
          <span className="info-value">{user.location || 'Not specified'}</span>
        </div>
        <div className="profile-info-row">
          <span className="info-label">🎓 Qualification:</span>
          <span className="info-value">{user.qualification || 'Not specified'}</span>
        </div>
        <div className="profile-info-row">
          <span className="info-label">🔥 Passion:</span>
          <span className="info-value">{user.passion || 'Not specified'}</span>
        </div>
        <div className="profile-info-row">
          <span className="info-label">🗣️ Languages:</span>
          <span className="info-value">{user.languages || 'Not specified'}</span>
        </div>
      </div>

      {/* Farming Information */}
      {user.role === 'Farmer' && (
        <div className="profile-card">
          <h2>🌾 Farming Information</h2>
          <div className="profile-info-row">
            <span className="info-label">🌾 Crops:</span>
            <span className="info-value">{user.crops || 'Not specified'}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">📐 Farm Size:</span>
            <span className="info-value">{user.farm_size || 'Not specified'}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">⏳ Experience:</span>
            <span className="info-value">
              {user.experience ? `${user.experience} years` : 'Not specified'}
            </span>
          </div>
        </div>
      )}

      {/* About Me */}
      {user.about && (
        <div className="profile-card">
          <h2>ℹ️ About Me</h2>
          <p className="about-text">{user.about}</p>
        </div>
      )}

      {/* Social Links */}
      {Object.keys(socialLinks).length > 0 && (
        <div className="profile-card">
          <h2>🌐 Social Links</h2>
          <div className="social-links">
            {socialLinks.whatsapp && (
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                📱 WhatsApp
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                📘 Facebook
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                📷 Instagram
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                ▶️ YouTube
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link">
                🌐 Website
              </a>
            )}
          </div>
        </div>
      )}
      {/* User's Posts */}
      {/* User Posts */}
      {userPosts.length > 0 && (
        <div className="profile-card">
          <h2>📝 Posts</h2>
          <div className="user-posts">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} onUpdate={fetchUserPosts} />
            ))}
          </div>
        </div>
      )}

      {/* Message Button */}
      <div className="profile-actions">
        <button className="message-btn">💬 Message</button>
      </div>
    </div>












  );
};

export default ProfileView;
