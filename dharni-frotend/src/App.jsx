import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import About from './components/About/About';
import Layout from './components/Layout/Layout';

import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CropSelection from './components/CropSelection/CropSelection';

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

        <Route path="/about" element={<About/>}></Route>
      </Routes>


      </Layout>
     
    </div>
  );
};

export default App;
