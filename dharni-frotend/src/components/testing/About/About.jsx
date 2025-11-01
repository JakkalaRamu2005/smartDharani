import React from 'react';
import "./about.css"

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">About Smart Dharani</h1>
          <p className="hero-text">
            Empowering farmers and citizens through AI voice technology — making agricultural knowledge simple, local, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h2 className="section-heading">Our Mission</h2>
              <p className="card-text">
                To simplify access to agricultural knowledge through AI-powered voice and multilingual tools, helping every farmer make informed, confident decisions.
              </p>
            </div>
            <div className="vision-card">
              <h2 className="section-heading">Our Vision</h2>
              <p className="card-text">
                To build a smarter, sustainable future where technology empowers rural communities — one conversation at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Passionate minds behind Smart Dharani</p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-photo">
                <div className="photo-placeholder">R</div>
              </div>
              <h3 className="team-name">Ram</h3>
              <p className="team-role">Co-founder & AI Developer</p>
              <p className="team-bio">
                Building Smart Dharani to make AI accessible and purposeful for every farmer.
              </p>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <div className="photo-placeholder">S</div>
              </div>
              <h3 className="team-name">Satyadev</h3>
              <p className="team-role">Co-founder & Product Designer</p>
              <p className="team-bio">
                Designing human-centered technology to make farming smarter and simpler.
              </p>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <div className="photo-placeholder">T</div>
              </div>
              <h3 className="team-name">Team Member</h3>
              <p className="team-role">Developer</p>
              <p className="team-bio">
                Contributing to the mission of empowering rural communities through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Map Section */}
      <section className="impact-section">
        <div className="container">
          <h2 className="section-title">Our Impact Across India</h2>
          <p className="section-subtitle">
            Smart Dharani is reaching farmers in Andhra Pradesh, Telangana, Karnataka, and beyond.
          </p>
          <div className="map-container">
            <div className="map-placeholder">
              <p>🗺️ Impact Map</p>
              <p className="map-text">Serving farmers across multiple states</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">From an idea to a growing movement</p>

          <div className="timeline-container">
            <div className="timeline-card">
              <h3 className="timeline-year">2023 – The Idea</h3>
              <p className="timeline-text">
                Ram and Satyadev envisioned Smart Dharani as a voice-based AI guide for farmers.
              </p>
            </div>

            <div className="timeline-card">
              <h3 className="timeline-year">2024 – Prototype Launch</h3>
              <p className="timeline-text">
                The first Smart Dharani chatbot launched, supporting Telugu and Hindi.
              </p>
            </div>

            <div className="timeline-card">
              <h3 className="timeline-year">2025 – Growing Impact</h3>
              <p className="timeline-text">
                Reached 10,000+ farmers across multiple states with multilingual AI assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Join Our Mission</h2>
          <p className="cta-text">
            Let's make agricultural knowledge accessible for every farmer in India.
          </p>
          <button className="cta-button">Contact Us</button>
        </div>
      </section>
    </div>
  );
}