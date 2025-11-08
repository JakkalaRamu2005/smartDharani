import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import About from './components/About/About';
import Layout from './components/Layout/Layout';
import IssueDiagnosis from './components/IssueDiagnosis/IssueDiagnosis';

import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CropSelection from './components/CropSelection/CropSelection';
import FarmingGuides from './components/FarmingGuides/FarmingGuides';
import Marketplace from './components/Marketplace/Marketplace';
import Contact from './components/Contact/contact';
const App = () => {
  return (
    <div className="App">
      <Layout>
         <Routes>
        {/* Public Routes - No Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/crop-selection" element={<CropSelection/>}/>
        {/* Protected Routes - With BOTH Top Navbar AND Sidebar */}

        <Route path="/about" element={<About/>} />
        <Route path="/issue-diagnosis" element={<IssueDiagnosis/>}/>
        <Route path="/farming-guides" element={<FarmingGuides/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>


      </Layout>
     
    </div>
  );
};

export default App;
