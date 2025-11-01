import React, { useState } from 'react';
import { BookOpen, Video, Mic, Download, Globe, Menu, X } from 'lucide-react';
import "./learnpage.css"

function LearnPage() {
  const [activeTab, setActiveTab] = useState('articles');
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resources = {
    articles: [
      { 
        title: "How to Improve Soil Health", 
        desc: "Simple steps to enrich your soil naturally using organic methods.", 
        category: "crops",
        icon: "📄" 
      },
      { 
        title: "Organic Farming Basics", 
        desc: "Start organic farming the easy way with proven techniques.", 
        category: "crops",
        icon: "📄" 
      },
      { 
        title: "Understanding Weather Patterns", 
        desc: "Learn to predict rain and plan your farming accordingly.", 
        category: "weather",
        icon: "📄" 
      },
      { 
        title: "Government Subsidy Schemes", 
        desc: "Complete guide to farming subsidies and how to apply.", 
        category: "schemes",
        icon: "📄" 
      },
      { 
        title: "Smart Fertilizer Usage", 
        desc: "Optimize fertilizer use for better yields and lower costs.", 
        category: "fertilizers",
        icon: "📄" 
      },
      { 
        title: "AI Tools for Farmers", 
        desc: "Discover how artificial intelligence can help your farm.", 
        category: "ai",
        icon: "📄" 
      },
    ],
    videos: [
      { 
        title: "Smart Irrigation Tutorial", 
        desc: "Learn to save water with modern irrigation technology.", 
        category: "ai",
        icon: "🎬" 
      },
      { 
        title: "AI in Farming", 
        desc: "See how AI helps modern farmers increase productivity.", 
        category: "ai",
        icon: "🎬" 
      },
      { 
        title: "Crop Disease Detection", 
        desc: "Identify and treat common crop diseases effectively.", 
        category: "crops",
        icon: "🎬" 
      },
      { 
        title: "Monsoon Preparation Guide", 
        desc: "Prepare your farm for the monsoon season successfully.", 
        category: "weather",
        icon: "🎬" 
      },
      { 
        title: "Fertilizer Application Methods", 
        desc: "Best practices for applying fertilizers to your crops.", 
        category: "fertilizers",
        icon: "🎬" 
      },
    ],
    podcasts: [
      { 
        title: "Farmer Success Stories", 
        desc: "Hear inspiring stories from real farmers across India.", 
        category: "all",
        icon: "🎧" 
      },
      { 
        title: "Weather Wisdom", 
        desc: "Expert tips to adapt to changing weather conditions.", 
        category: "weather",
        icon: "🎧" 
      },
      { 
        title: "Organic Revolution", 
        desc: "The future of organic farming in rural communities.", 
        category: "crops",
        icon: "🎧" 
      },
      { 
        title: "Government Schemes Explained", 
        desc: "Understanding agricultural policies and benefits.", 
        category: "schemes",
        icon: "🎧" 
      },
    ],
  };

  const filters = [
    { id: 'all', label: 'All Topics' },
    { id: 'crops', label: 'Crops' },
    { id: 'weather', label: 'Weather' },
    { id: 'ai', label: 'AI Tools' },
    { id: 'fertilizers', label: 'Fertilizers' },
    { id: 'schemes', label: 'Government Schemes' },
  ];

  const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Marathi'];

  const filteredResources = activeFilter === 'all' 
    ? resources[activeTab]
    : resources[activeTab].filter(item => item.category === activeFilter);

  const scrollToContent = () => {
    document.querySelector('.tabs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="learn-page">
      {/* Header */}
      <header className="learn-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🌾</div>
            <h2>Smart Dharani Learn</h2>
          </div>
          
          <div className="header-right">
            <div className="language-switcher">
              <Globe size={20} />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="learn-hero">
        <div className="hero-content">
          <h1>Grow Smarter with Knowledge 🌾</h1>
          <p>Learn about crops, weather, and smart farming in your own language.</p>
          <button className="hero-btn" onClick={scrollToContent}>
            Start Learning
          </button>
        </div>
        <div className="hero-illustration">
          <div className="illustration-circle">📚</div>
        </div>
      </section>

      {/* Offline Support Banner */}
      <div className="offline-banner">
        <Download size={24} />
        <div className="offline-text">
          <strong>No internet? No problem!</strong>
          <span>Download lessons to learn anytime, anywhere.</span>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="tabs-section">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => { setActiveTab('articles'); setActiveFilter('all'); }}
            aria-label="View articles"
          >
            <BookOpen size={20} />
            <span>Articles</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => { setActiveTab('videos'); setActiveFilter('all'); }}
            aria-label="View videos"
          >
            <Video size={20} />
            <span>Videos</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'podcasts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('podcasts'); setActiveFilter('all'); }}
            aria-label="View podcasts"
          >
            <Mic size={20} />
            <span>Podcasts</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              aria-label={`Filter by ${filter.label}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="resource-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map((item, index) => (
              <div className="resource-card" key={index}>
                <div className="resource-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="resource-actions">
                  <button className="btn-primary" aria-label={`View ${item.title}`}>
                    ▶️ {activeTab === 'articles' ? 'Read' : activeTab === 'videos' ? 'Watch' : 'Listen'}
                  </button>
                  <button className="btn-secondary" aria-label={`Download ${item.title}`}>
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No {activeTab} found for this category. Try a different filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="learn-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="#youtube" aria-label="YouTube">📺</a>
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#whatsapp" aria-label="WhatsApp">💬</a>
          </div>
          <p className="footer-copyright">© 2025 Smart Dharani — Empowering Rural Learners 🌱</p>
        </div>
      </footer>

    </div>
  );
}

export default LearnPage;