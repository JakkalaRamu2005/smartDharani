import React from 'react';
import './About.css';

const About = () => {
  const handleJoinWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VbAaBKrDp2Q5lwqJv00u', '_blank');
  };

  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="about-title">About Smart Dharani</h1>
        
        <p className="about-intro">
          Smart Dharani is a revolutionary agricultural platform that empowers farmers with cutting-edge technology and market access. Our mission is to transform traditional farming practices through innovative solutions and sustainable approaches.
        </p>
      </div>
      
      <div className="vision-mission-container">
        <div className="info-card">
          <h2 className="card-title">Our Vision</h2>
          <p className="card-text">
            To create a sustainable and technologically advanced agricultural ecosystem that benefits farmers, consumers, and the environment.
          </p>
        </div>
        
        <div className="info-card">
          <h2 className="card-title">Our Mission</h2>
          <p className="card-text">
            Empowering farmers with smart solutions while promoting sustainable farming practices and ensuring food security for future generations.
          </p>
        </div>
      </div>
      
      <div className="impact-section">
        <h2 className="section-title">Our Impact</h2>
        
        <p className="section-text">
          Smart Dharani is a collaborative effort built by passionate individuals aiming to revolutionize agriculture in Telangana and beyond. It merges AI-powered insights with ground-level needs, ensuring that both traditional and modern farming practices co-exist and thrive.
        </p>
      </div>
      
      <div className="community-section">
        <h2 className="section-title">Join Our Community</h2>
        
        <p className="section-text">
          Be part of a growing community of farmers, agricultural experts, and enthusiasts. Share knowledge, get support, and grow together.
        </p>
        
        <button onClick={handleJoinWhatsApp} className="join-button">
          Join Smart Dharani Today
        </button>
      </div>
    </div>
  );
};

export default About;
