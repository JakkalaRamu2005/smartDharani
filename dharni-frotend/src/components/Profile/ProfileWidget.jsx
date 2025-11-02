import React, { useState } from 'react';
import ProfileMenu from './ProfileMenu.jsx';
import './styles/profileWidget.css';

const ProfileWidget = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  return (
    <div className="profile-widget-container">
      <div className="profile-widget" onClick={() => setShowMenu(!showMenu)}>
        <img
          src={user.profile_photo || '/default-avatar.png'}
          alt={user.name || 'User'}
          className="profile-widget-photo"
        />
        <div className="profile-widget-info">
          <p className="profile-widget-name">{user.username || 'Guest'}</p>
          <div className="profile-widget-status">
            <span className={`status-dot ${user.is_online ? 'online' : 'offline'}`}></span>
            <span className="status-text">{user.is_online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>

      {showMenu && <ProfileMenu onClose={() => setShowMenu(false)} />}
    </div>
  );
};

export default ProfileWidget;
