import React, { useState } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import SkeletonLoader from '../utils/SkeletonLoader';
import './CropSelection.css';

const CropSelection = () => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    landSize: '',
    irrigation: '',
    waterAvailability: 'sufficient',
    previousCrop: '',
    additionalInfo: '',
    language: 'english'
  });

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');

  // Language options
  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  const soilTypes = ['Clay Soil', 'Sandy Soil', 'Loamy Soil', 'Black Soil', 'Red Soil', 'Laterite Soil'];
  const irrigationTypes = ['Canal', 'Borewell', 'River', 'Drip', 'Sprinkler', 'Rain-fed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const response = await fetch('https://smartdharani-2.onrender.com/api/crop/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data.recommendations);
      } else {
        setError(data.message || 'Failed to get recommendations');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-selection-page">
      <div className="crop-header">
        <h1 className="crop-title">🌾 AI Crop Selection</h1>
        <p className="crop-subtitle">
          Get personalized crop recommendations based on your land conditions
        </p>
      </div>

      {/* Language Selector */}
      <div className="language-selector-container">
        <label className="language-label">🌐 Select Language / भाषा चुनें</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="language-select"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="crop-form">
        {/* Location & Soil Section */}
        <div className="form-section">
          <h3 className="section-title">📍 Location & Soil Information</h3>

          <div className="form-group">
            <label htmlFor="location-input">Location *</label>
            <input
              id="location-input"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Warangal, Telangana"
              required
              aria-required="true"
              aria-label="Enter your location"
            />
          </div>

          <div className="form-group">
            <label>Soil Type *</label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Land Details Section */}
        <div className="form-section">
          <h3 className="section-title">📏 Land Details</h3>

          <div className="form-group">
            <label>Land Size (acres) *</label>
            <input
              type="number"
              name="landSize"
              value={formData.landSize}
              onChange={handleInputChange}
              placeholder="e.g., 2"
              min="0.1"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label>Irrigation Type *</label>
            <select
              name="irrigation"
              value={formData.irrigation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Irrigation Type</option>
              {irrigationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Water Availability Section */}
        <div className="form-section">
          <h3 className="section-title">💧 Water Availability</h3>

          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="waterAvailability"
                value="sufficient"
                checked={formData.waterAvailability === 'sufficient'}
                onChange={handleInputChange}
              />
              <span>Sufficient</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="waterAvailability"
                value="limited"
                checked={formData.waterAvailability === 'limited'}
                onChange={handleInputChange}
              />
              <span>Limited</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="waterAvailability"
                value="rainfed"
                checked={formData.waterAvailability === 'rainfed'}
                onChange={handleInputChange}
              />
              <span>Only Rain-fed</span>
            </label>
          </div>
        </div>

        {/* Optional Information Section */}
        <div className="form-section">
          <h3 className="section-title">🌱 Additional Information (Optional)</h3>

          <div className="form-group">
            <label>Previous Crop</label>
            <input
              type="text"
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleInputChange}
              placeholder="e.g., Cotton, Rice"
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any specific requirements or information about your land"
              rows="4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? "Getting recommendations..." : "Get AI recommendations"}
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" label="Getting AI Recommendations..." />
              <span style={{ marginLeft: '8px' }}>Getting AI Recommendations...</span>
            </>
          ) : (
            <>
              ✨ Get AI Recommendations
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </form>

      {/* Results Section */}
      {recommendations && (
        <div className="recommendations-section">
          <h2 className="recommendations-title">✨ Your AI-Powered Recommendations</h2>
          <div className="recommendations-content">
            <pre>{recommendations}</pre>
          </div>
          <button
            onClick={() => setRecommendations(null)}
            className="reset-button"
          >
            Try Different Parameters
          </button>
        </div>
      )}
    </div>
  );
};

export default CropSelection;
