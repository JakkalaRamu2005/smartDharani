import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './styles/profileEdit.css';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
  
    role: '',
    location: '',
    qualification: '',
    passion: '',
    crops: '',
    farm_size: '',
    experience: '',
    languages: '',
    about: '',
    profile_photo: '',
    social_links: {
      whatsapp: '',
      facebook: '',
      instagram: '',
      youtube: '',
      website: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const data = await getProfile(userId);
      const user = data.user;

      const socialLinks = typeof user.sociallinks === 'string'
        ? JSON.parse(user.sociallinks)
        : user.sociallinks || {};

      setFormData({
    
        role: user.role || '',
        location: user.location || '',
        qualification: user.qualification || '',
        passion: user.passion || '',
        crops: user.crops || '',
        farm_size: user.farmsize || '',
        experience: user.experience || '',
        languages: user.languages || '',
        about: user.about || '',
        profile_photo: user.profilephoto || '',
        social_links: {
          whatsapp: socialLinks.whatsapp || '',
          facebook: socialLinks.facebook || '',
          instagram: socialLinks.instagram || '',
          youtube: socialLinks.youtube || '',
          website: socialLinks.website || ''
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile(userId, formData);
      alert('✅ Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="profile-edit">
      <h1>⚙️ Edit Profile</h1>

      <form onSubmit={handleSubmit} className="edit-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Role / Occupation *</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Farmer">Farmer</option>
              <option value="Student">Student</option>
              <option value="Officer">Officer</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location (Village, District, State)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Vemulawada, Telangana"
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="e.g., B.Sc Agriculture"
            />
          </div>

          <div className="form-group">
            <label>Passion / Interests</label>
            <input
              type="text"
              name="passion"
              value={formData.passion}
              onChange={handleChange}
              placeholder="e.g., AI in Farming"
            />
          </div>

          <div className="form-group">
            <label>Languages Known</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              placeholder="e.g., Telugu, English, Hindi"
            />
          </div>

          <div className="form-group">
            <label>Profile Photo URL</label>
            <input
              type="text"
              name="profile_photo"
              value={formData.profile_photo}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Farming Information */}
        {formData.role === 'Farmer' && (
          <div className="form-section">
            <h2>🌾 Farming Information</h2>

            <div className="form-group">
              <label>Crops You Grow</label>
              <input
                type="text"
                name="crops"
                value={formData.crops}
                onChange={handleChange}
                placeholder="e.g., Cotton, Paddy, Maize"
              />
            </div>

            <div className="form-group">
              <label>Farm Size</label>
              <input
                type="text"
                name="farm_size"
                value={formData.farm_size}
                onChange={handleChange}
                placeholder="e.g., 5 acres"
              />
            </div>

            <div className="form-group">
              <label>Farming Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 10"
              />
            </div>
          </div>
        )}

        {/* About Me */}
        <div className="form-section">
          <h2>About Me</h2>
          <div className="form-group">
            <label>Bio / About Yourself</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="form-section">
          <h2>🌐 Social Links</h2>

          <div className="form-group">
            <label>WhatsApp</label>
            <input
              type="url"
              name="whatsapp"
              value={formData.social_links.whatsapp}
              onChange={handleSocialChange}
              placeholder="https://wa.me/..."
            />
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.social_links.facebook}
              onChange={handleSocialChange}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.social_links.instagram}
              onChange={handleSocialChange}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="form-group">
            <label>YouTube</label>
            <input
              type="url"
              name="youtube"
              value={formData.social_links.youtube}
              onChange={handleSocialChange}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.social_links.website}
              onChange={handleSocialChange}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/profile')}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
