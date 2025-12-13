import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null); // Initialize as null to indicate no data yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🔍 Profile component mounted, userId:', userId); // Debug
    if (userId) {
      fetchProfile();
    } else {
      setError('User ID not found');
      setLoading(false);
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      console.log('📡 Fetching profile from API...'); // Debug
      const { data } = await axiosInstance.get(`/profile/${userId}`);
      console.log('✅ Profile data received:', data); // Debug

      // Even if data is null/empty from backend, we set it to allow UI to render 'Not set'
      setProfile(data || {});
      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching profile:', err); // Debug

      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
      } else if (err.response?.status === 404) {
        // Handle 404 specifically - valid case for new user
        console.log('User profile not found (404), treating as new user.');
        setProfile({}); // Set empty profile so UI renders "Not set"
      } else {
        setError('Failed to load profile');
      }
      setLoading(false);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>
          Edit Profile
        </button>
      </div>

      <div className="profile-card">
        {profile?.profile_image ? (
          <img
            src={profile.profile_image}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">No Image</div>
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
