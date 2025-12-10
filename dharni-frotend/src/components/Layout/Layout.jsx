import React from 'react';
import Sidebar from '../Home/Sidebar';
import TopNavbar from './TopNavbar';
import './styles/Layout.css';
import { Outlet } from 'react-router';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Navigation sidebar */}
      <nav aria-label="Main navigation">
        <Sidebar />
      </nav>

      <div className="layout-main">
        <TopNavbar />
        {/* Main content area - target for skip navigation */}
        <main id="main-content" className="layout-content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
