import "./App.css"
import React from 'react'
import Login from './components/Login/Login'
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import About from "./components/About/About"
import Navbar from "./components/Navbar/Navbar"
import Chatbox from "./components/Chatbot/Chatbox"
import Services from "./components/Services/Services"
import Contact from "./components/Contact/contact"
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
           <Navbar />
        {/* <Chatbox /> */}
      
        <Routes>
       
        {/* 🌐 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
    </BrowserRouter >
  );
}

export default App
