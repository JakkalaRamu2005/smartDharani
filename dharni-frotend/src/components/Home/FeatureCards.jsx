// FeatureCards.jsx
import React from 'react';
import "./styles/featurecard.css"

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: '🌾',
      title: 'AI Crop Selection',
      description: 'Get personalized recommendations based on your soil and climate.',
      link: '/crop-selection',
      bgImage: 'https://res.cloudinary.com/dcsglluc4/image/upload/v1762937498/aicropselection_ekwvxb.jpg'
    },
    {
      id: 2,
      icon: '📚',
      title: 'Expert Farming Guides',
      description: 'Step-by-step instructions from land preparation to harvest.',
      link: '/farming-guides',
      bgImage: 'https://res.cloudinary.com/dcsglluc4/image/upload/v1762937497/expertfarmingguides_ktqfm7.jpg'
    },
    {
      id: 3,
      icon: '🔬',
      title: 'Smart Issue Diagnosis',
      description: 'Identify and solve crop problems with AI assistance.',
      link: '/issue-diagnosis',
      bgImage: 'https://res.cloudinary.com/dcsglluc4/image/upload/v1762937498/smartissuediogonosis_iammcl.jpg'
    }
  ];

  return (
    <div className="feature-cards-container">
      {features.map((feature) => (
        <div key={feature.id} className="feature-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${feature.bgImage})` }}
          />
          <div className="card-content">
            <div className="card-icon">{feature.icon}</div>
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-description">{feature.description}</p>
            <a href={feature.link} className="card-link">
              Explore Now <span style={{ fontSize: '1.2em' }}>→</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
