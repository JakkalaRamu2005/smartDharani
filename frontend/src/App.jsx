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
        <Chatbox/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />}/>
          {/* } />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} /> */}
          <Route path="/contact" element={<Contact/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App
