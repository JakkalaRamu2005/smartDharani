import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import design system CSS files first
import './styles/variables.css'
import './styles/utilities.css'
import './styles/darkmode.css'
import './styles/animations.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './components/context/AuthContext.jsx'
import { ThemeProvider } from './components/context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)
