import React from 'react';
import { Target, Eye, Sprout, Users, HeartHandshake, Leaf } from 'lucide-react';
import './About.css';

const About = () => {
  const handleJoinWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VbAaBKrDp2Q5lwqJv00u', '_blank');
  };

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="about-subtitle">
          <Sprout size={20} className="subtitle-icon" />
          <span>Our Story</span>
        </div>
        <h1 className="about-title">Revolutionizing Agriculture with Technology</h1>

        <p className="about-intro">
          Smart Dharani is bridging the gap between traditional farming and modern technology.
          We empower farmers with data-driven insights, market access, and sustainable solutions
          to ensure improved yields and better livelihoods.
        </p>
      </div>

      <div className="vision-mission-container">
        <div className="info-card vision-card">
          <div className="card-icon-wrapper">
            <Eye className="card-icon" size={28} />
          </div>
          <div className="card-content">
            <h2 className="card-title">Our Vision</h2>
            <p className="card-text">
              To create a sustainable, technologically advanced agricultural ecosystem where every farmer has access to global markets and smart tools for precision farming.
            </p>
          </div>
        </div>

        <div className="info-card mission-card">
          <div className="card-icon-wrapper">
            <Target className="card-icon" size={28} />
          </div>
          <div className="card-content">
            <h2 className="card-title">Our Mission</h2>
            <p className="card-text">
              Empowering the agrarian community with AI-driven crop diagnosis, real-time market insights, and expert guidance to foster food security and economic growth.
            </p>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <div className="impact-content">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-text">
            Built by passionate individuals committed to rural development, Smart Dharani merges AI-powered intelligence with ground-level realities. We celebrate the coexistence of wisdom and innovation.
          </p>


        </div>
        <div className="impact-visual">
          {/* Abstract visual element */}
          <Leaf className="impact-icon" size={120} strokeWidth={0.5} />
        </div>
      </div>

      <div className="community-section">
        <div className="community-content">
          <div className="community-icon-wrapper">
            <Users size={32} />
          </div>
          <h2 className="section-title">Join Our Community</h2>

          <p className="section-text">
            Connect with a growing network of farmers, agricultural experts, and enthusiasts.
            Share knowledge, resolve queries, and grow together in a supportive environment.
          </p>

          <button onClick={handleJoinWhatsApp} className="join-button">
            <HeartHandshake size={20} style={{ marginRight: '8px' }} />
            Join Smart Dharani Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
