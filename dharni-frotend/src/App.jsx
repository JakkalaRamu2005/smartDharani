// import "./App.css"
import React from 'react'
import Login from './components/Login/Login'
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import About from "./components/About/About"
import Navbar from "./components/Navbar/Navbar"
import Services from "./components/Services/Services"
import Contact from "./components/Contact/contact"
import Chatbot from './components/Chatbot/Chatbot'

const App = () => {
  return (
  
      <div className="App">
        <Chatbot />
        <Routes>
          
          {/* 🌐 Public Routes - No Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes - With Navbar */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <About />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Services />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Contact />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
   
  );
}

export default App