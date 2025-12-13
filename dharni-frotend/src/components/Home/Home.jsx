import React from 'react';
import Sidebar from './Sidebar';
import Hero from './Hero';
import FeatureCards from './FeatureCards';
import CallToAction from './CallToAction';
import "./styles/home.css"
import About from '../About/About';
import Contact from '../Contact/Contact';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Hero />
        <FeatureCards />
        <CallToAction />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
