import React from 'react';
import Sidebar from './Sidebar';
import Hero from './Hero';
import FeatureCards from './FeatureCards';
import CallToAction from './CallToAction';
import "./styles/home.css"

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Hero />
        <FeatureCards />
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
