import React from 'react';
import Sidebar from '../Home/Sidebar';
import TopNavbar from './TopNavbar';
import './styles/Layout.css';
import { Outlet } from 'react-router';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
        <Sidebar/>
     
      <div className="layout-main">
        <TopNavbar />
        <div className="layout-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
