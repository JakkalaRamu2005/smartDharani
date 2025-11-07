import React, { useState } from 'react';
import './FarmingGuides.css';

const FarmingGuides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // All guides with exact PDF links from your document
  const guides = [
    {
      id: 1,
      title: "Beginner's Guide to Rice Cultivation",
      image: '/lovable-uploads/11fc7518-8429-4c53-9920-cf1fc521eb1b.png',
      category: 'Grains',
      level: 'Beginner',
      time: '15 min read',
      pdfUrl: 'https://drive.google.com/file/d/19fjkDY4eiXPhgNeibc2gw4LlrdJ0b1nw/view?usp=sharing'
    },
    {
      id: 2,
      title: 'Cotton Cultivation Guide (Telugu)',
      image: '/lovable-uploads/446b8ed0-70ed-4f85-9895-282a141f65f3.png',
      category: 'Grains',
      level: 'Intermediate',
      time: '20 min read',
      pdfUrl: 'https://www.pjtau.edu.in/files/publications/2024/HDPS-cotton-Telugu-pjtsau.pdf'
    },
    {
      id: 3,
      title: 'Maize (Corn) Farming Practices',
      image: '/lovable-uploads/5161da8d-74b2-4074-bec0-4874125b3602.png',
      category: 'Grains',
      level: 'Intermediate',
      time: '15 min read',
      pdfUrl: 'https://static.vikaspedia.in/media_vikaspedia/te/images/agriculture/c35c4dc2fc35c38c3ec2f-c2ac02c1ac3ec02c17c02-1/VPanchangam.pdf'
    },
    {
      id: 4,
      title: 'Redgram Cultivation (Kandulu)',
      image: '/lovable-uploads/0eddb35d-8dfe-4159-a34c-9b8e4dda28f0.png',
      category: 'Pulses',
      level: 'Intermediate',
      time: '12 min read',
      pdfUrl: 'https://static.vikaspedia.in/media_vikaspedia/te/images/agriculture/c35c4dc2fc35c38c3ec2f-c2ac02c1ac3ec02c17c02-1/kamdi.pdf'
    },
    {
      id: 5,
      title: 'Greengram & Blackgram Farming',
      image: '/lovable-uploads/446b8ed0-70ed-4f85-9895-282a141f65f3.png',
      category: 'Pulses',
      level: 'Intermediate',
      time: '12 min read',
      pdfUrl: 'https://static.vikaspedia.in/media_vikaspedia/te/images/agriculture/c35c4dc2fc35c38c3ec2f-c2ac02c1ac3ec02c17c02-1/pesara.pdf'
    },
    {
      id: 6,
      title: 'Groundnut Cultivation Guide',
      image: '/lovable-uploads/11fc7518-8429-4c53-9920-cf1fc521eb1b.png',
      category: 'Oilseeds',
      level: 'Intermediate',
      time: '15 min read',
      pdfUrl: 'https://drive.google.com/file/d/19iI8ibxrgLN7LMzCJC9tdFQT0HrVCrB3/view?usp=sharing'
    },
    {
      id: 7,
      title: 'Organic Vegetable Farming Techniques',
      image: '/lovable-uploads/446b8ed0-70ed-4f85-9895-282a141f65f3.png',
      category: 'Vegetables',
      level: 'Intermediate',
      time: '20 min read',
      pdfUrl: 'https://svuniversity.edu.in/storage/2022/09/18.-Organic-Farming.pdf'
    },
    {
      id: 8,
      title: 'Efficient Irrigation for Small Farms',
      image: '/lovable-uploads/5161da8d-74b2-4074-bec0-4874125b3602.png',
      category: 'Techniques',
      level: 'All Levels',
      time: '10 min read',
      pdfUrl: 'https://drive.google.com/file/d/1Ws6jzlm85WHCsgSjo41XA1UyVSGgfAdb/view?usp=sharing'
    },
    {
      id: 9,
      title: 'Natural Pest Control Strategies',
      image: '/lovable-uploads/0eddb35d-8dfe-4159-a34c-9b8e4dda28f0.png',
      category: 'Protection',
      level: 'Intermediate',
      time: '12 min read',
      pdfUrl: 'https://drive.google.com/file/d/1Lmgo3d3GsmWeoqNFAN5E2TSRW2mangYr/view?usp=sharing'
    },
    {
      id: 10,
      title: 'All in one Guide for Vegetables Cultivation',
      image: '/lovable-uploads/446b8ed0-70ed-4f85-9895-282a141f65f3.png',
      category: 'Vegetables',
      level: 'Comprehensive',
      time: '5 hrs read',
      pdfUrl: 'https://horticulture.tg.nic.in/Downloads/Litrature/veg%20-%20cultivation%20BOOK%20123.pdf'
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(guides.map(g => g.category))];
  const levels = ['All', ...new Set(guides.map(g => g.level))];

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || guide.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleReadGuide = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="farming-guides-page">
      {/* Header */}
      <div className="guides-header">
        <h1 className="guides-title">📚 Expert Farming Guides</h1>
        <p className="guides-subtitle">
          Step-by-step instructions from land preparation to harvest
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for farming guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Category:</label>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Difficulty Level:</label>
          <div className="filter-buttons">
            {levels.map(level => (
              <button
                key={level}
                className={`filter-button ${selectedLevel === level ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="guides-grid">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <div key={guide.id} className="guide-card">
              <div className="guide-image">
                <img src={guide.image} alt={guide.title} />
              </div>

              <div className="guide-content">
                <div className="guide-meta">
                  <span className="category-badge">{guide.category}</span>
                  <span className="time-badge">{guide.time}</span>
                </div>

                <h3 className="guide-title">{guide.title}</h3>

                <div className="guide-footer">
                  <span className="level-badge">
                    Level: <strong>{guide.level}</strong>
                  </span>
                  <button
                    onClick={() => handleReadGuide(guide.pdfUrl)}
                    className="read-button"
                  >
                    Read Guide →
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No guides found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingGuides;
