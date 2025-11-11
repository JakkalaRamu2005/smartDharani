import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/hero.css"

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1 className="hero-title">Welcome to Smart Dharani</h1>
        <p className="hero-description">
          Your AI-powered farming assistant for smarter agriculture and better yields
        </p>
        <Link to="/login" className="hero-button">
          Get Started →
        </Link>
      </div>
    </div>
  );
};

export default Hero;
