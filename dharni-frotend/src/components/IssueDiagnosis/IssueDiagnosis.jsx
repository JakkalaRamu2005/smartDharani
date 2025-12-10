import React, { useState, useRef } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import SkeletonLoader from '../utils/SkeletonLoader';
import './IssueDiagnosis.css';

const IssueDiagnosis = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [formData, setFormData] = useState({
    description: '',
    cropType: '',
    symptoms: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Language options
  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' }
  ];

  // Common symptoms
  const symptoms = [
    { id: 'yellowing', label: 'Yellowing Leaves' },
    { id: 'wilting', label: 'Wilting' },
    { id: 'spots', label: 'Brown Spots' },
    { id: 'powdery', label: 'Powdery Mildew' },
    { id: 'holes', label: 'Holes in Leaves' },
    { id: 'curl', label: 'Leaf Curl' },
    { id: 'wilt', label: 'Plant Wilt' },
    { id: 'stunting', label: 'Stunted Growth' }
  ];

  // Crop types
  const cropTypes = ['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize', 'Sugarcane', 'Groundnut'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSymptomChange = (symptomId) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDiagnosis(null);

    try {
      let imageBase64 = null;
      if (imageFile) {
        imageBase64 = await convertImageToBase64(imageFile);
      }

      const payload = {
        description: formData.description,
        cropType: formData.cropType,
        symptoms: formData.symptoms,
        image: imageBase64,
        language: selectedLanguage
      };

      const response = await fetch('https://smartdharani-2.onrender.com/api/diagnosis/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setDiagnosis(data.data);
      } else {
        setError(data.message || 'Failed to diagnose the issue');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      description: '',
      cropType: '',
      symptoms: []
    });
    setImageFile(null);
    setImagePreview(null);
    setDiagnosis(null);
    setError('');
    fileInputRef.current.value = '';
  };

  return (
    <div className="issue-diagnosis-page">
      <div className="diagnosis-header">
        <h1 className="diagnosis-title">🔍 Smart Crop Diagnosis</h1>
        <p className="diagnosis-subtitle">
          Upload an image or describe your crop issue to get AI-powered diagnosis
        </p>
      </div>

      {/* Language Selector */}
      <div className="language-selector-container">
        <label className="language-label">🌐 Select Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-select"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Diagnosis Form */}
      <form onSubmit={handleSubmit} className="diagnosis-form">
        {/* Image Upload Section */}
        <div className="form-section">
          <h3 className="section-title">📸 Upload Crop Image</h3>

          <div
            className="image-upload-area"
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <>
                <span className="upload-icon">📷</span>
                <p className="upload-text">Click to upload or drag and drop</p>
                <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          {imagePreview && (
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                fileInputRef.current.value = '';
              }}
            >
              ✕ Remove Image
            </button>
          )}
        </div>

        {/* Crop Type Section */}
        <div className="form-section">
          <h3 className="section-title">🌾 Crop Type</h3>

          <label htmlFor="crop-type-select" className="sr-only">Select crop type</label>
          <select
            id="crop-type-select"
            value={formData.cropType}
            onChange={(e) => setFormData(prev => ({ ...prev, cropType: e.target.value }))}
            className="form-input"
            required
            aria-required="true"
            aria-label="Select the type of crop"
          >
            <option value="">Select Crop Type</option>
            {cropTypes.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Symptoms Section */}
        <div className="form-section">
          <h3 className="section-title">⚠️ Observable Symptoms</h3>

          <div className="symptoms-grid">
            {symptoms.map(symptom => (
              <label key={symptom.id} className="symptom-checkbox">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom.id)}
                  onChange={() => handleSymptomChange(symptom.id)}
                />
                <span className="checkbox-label">{symptom.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="form-section">
          <h3 className="section-title">📝 Problem Description</h3>

          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the problem you're observing on your crop..."
            className="form-textarea"
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? "Analyzing crop issue..." : "Diagnose crop issue"}
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" label="Analyzing crop issue..." />
              <span style={{ marginLeft: '8px' }}>Analyzing...</span>
            </>
          ) : (
            <>
              ✨ Diagnose Now
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

      {/* Diagnosis Results */}
      {diagnosis && (
        <div className="results-section">
          <h2 className="results-title">✨ Diagnosis Results</h2>

          {/* Issue Identified */}
          <div className="result-card">
            <h3 className="result-card-title">🎯 Issue Identified</h3>
            <p className="result-diagnosis">{diagnosis.diagnosis}</p>
          </div>

          {/* Summary */}
          <div className="result-card">
            <h3 className="result-card-title">📄 Problem Summary</h3>
            <p className="result-text">{diagnosis.summary}</p>
          </div>

          {/* Treatment Steps */}
          <div className="result-card">
            <h3 className="result-card-title">💡 Treatment Steps</h3>
            <ol className="treatment-list">
              {diagnosis.treatmentSteps && diagnosis.treatmentSteps.map((step, index) => (
                <li key={index} className="treatment-item">{step}</li>
              ))}
            </ol>
          </div>

          {/* Product Suggestions */}
          {diagnosis.productSuggestions && diagnosis.productSuggestions.length > 0 && (
            <div className="result-card">
              <h3 className="result-card-title">🛒 Recommended Products</h3>
              <ul className="products-list">
                {diagnosis.productSuggestions.map((product, index) => (
                  <li key={index} className="product-item">{product}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleReset} className="reset-button">
              🔄 Diagnose Another Issue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDiagnosis;
