import React from 'react';
import "./styles/featurecard.css"

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: '🌾',
      title: 'AI Crop Selection',
      description: 'Get personalized recommendations based on your soil and climate.',
      link: '/crop-selection'
    },
    {
      id: 2,
      icon: '📚',
      title: 'Expert Farming Guides',
      description: 'Step-by-step instructions from land preparation to harvest.',
      link: '/farming-guides'
    },
    {
      id: 3,
      icon: '🔬',
      title: 'Smart Issue Diagnosis',
      description: 'Identify and solve crop problems with AI assistance.',
      link: '/issue-diagnosis'
    }
  ];

  return (
    <div className="feature-cards-container">
      {features.map((feature) => (
        <div key={feature.id} className="feature-card">
          <div className="card-image">
            <span className="card-icon">{feature.icon}</span>
          </div>
          <div className="card-content">
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-description">{feature.description}</p>
            <a href={feature.link} className="card-link">
              Learn more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
