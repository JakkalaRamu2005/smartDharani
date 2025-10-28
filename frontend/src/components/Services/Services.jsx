import React from 'react';
import { Sprout, Cloud, Mic, Lightbulb, TrendingUp, FileText } from 'lucide-react';
import './services.css';

const ServicesPage = () => {
  const services = [
    {
      icon: <Sprout size={48} />,
      title: 'Crop Advisory',
      description: 'Get daily crop insights customized for your region.',
      cta: 'Try Now',
      color: '#4CAF50'
    },
    {
      icon: <Cloud size={48} />,
      title: 'Weather Alerts',
      description: 'Stay updated on rainfall and temperature changes in your area.',
      cta: 'Get Alerts',
      color: '#2196F3'
    },
    {
      icon: <Mic size={48} />,
      title: 'AI Voice Assistant',
      description: 'Ask farming questions in your local language with voice access.',
      cta: 'Talk to Dharani',
      color: '#FF9800'
    },
    {
      icon: <Lightbulb size={48} />,
      title: 'Smart Recommendations',
      description: 'Discover the best crops, fertilizers, and techniques for your soil.',
      cta: 'Explore Now',
      color: '#FFC107'
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Market Price Updates',
      description: 'Check daily mandi prices and make smart selling decisions.',
      cta: 'View Prices',
      color: '#9C27B0'
    },
    {
      icon: <FileText size={48} />,
      title: 'Government Schemes',
      description: 'Find out about the latest agricultural schemes and subsidies.',
      cta: 'Know More',
      color: '#795548'
    }
  ];

  const handleServiceClick = (serviceName) => {
    alert(`${serviceName} feature coming soon!`);
  };

  return (
    <div className="services-page">
      {/* Header Section */}
      <section className="services-header">
        <div className="header-content">
          <h1 className="services-title">Our Smart Services</h1>
          <p className="services-subtitle">
            Empowering farmers and citizens with AI-driven agriculture solutions.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-grid-section">
        <div className="services-container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button 
                  className="service-cta"
                  onClick={() => handleServiceClick(service.title)}
                >
                  {service.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2 className="cta-title">Ready to grow smarter with Smart Dharani?</h2>
          <p className="cta-text">Join thousands of farmers making better decisions every day.</p>
          <div className="cta-buttons">
            <button className="cta-primary">Start Free</button>
            <button className="cta-secondary">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="services-footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="YouTube">🎥</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Smart Dharani. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;