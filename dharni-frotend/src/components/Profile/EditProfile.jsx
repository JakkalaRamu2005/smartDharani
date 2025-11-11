import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./ProfileEdit.css"

const EditProfile = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    location: '',
    bio: '',
    preferred_language: 'english',
    profile_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get(`/profile/${userId}`);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        location: data.location || '',
        bio: data.bio || '',
        preferred_language: data.preferred_language || 'english',
        profile_image: data.profile_image || ''
      });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axiosInstance.put(`/profile/${userId}`, formData);
      setMessage('✅ Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
      } else {
        setMessage('❌ Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Profile Image URL</label>
          <input
            type="text"
            name="profile_image"
            value={formData.profile_image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Preferred Language</label>
          <select
            name="preferred_language"
            value={formData.preferred_language}
            onChange={handleChange}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>

        {message && <p className="message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
