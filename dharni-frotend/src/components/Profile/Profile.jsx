import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import "./Profile.css"

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9291/api/profile/${userId}`,
        { withCredentials: true }
      );
      setProfile(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      
      <div className="profile-card">
        {profile?.profile_image && (
          <img 
            src={profile.profile_image} 
            alt="Profile" 
            className="profile-image"
          />
        )}
        
        <div className="profile-details">
          <div className="profile-field">
            <label>Full Name:</label>
            <p>{profile?.full_name || 'Not set'}</p>
          </div>

          <div className="profile-field">
            <label>Phone:</label>
            <p>{profile?.phone || 'Not set'}</p>
          </div>

          <div className="profile-field">
            <label>Location:</label>
            <p>{profile?.location || 'Not set'}</p>
          </div>

          <div className="profile-field">
            <label>Bio:</label>
            <p>{profile?.bio || 'Not set'}</p>
          </div>

          <div className="profile-field">
            <label>Preferred Language:</label>
            <p>{profile?.preferred_language || 'English'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
