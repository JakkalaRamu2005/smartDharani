import "./App.css"
import React from 'react'
import Login from './components/Login/Login'
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import About from "./components/About/About"
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
      <Home/>
      </div>
    </BrowserRouter>
  );
}

export default App
