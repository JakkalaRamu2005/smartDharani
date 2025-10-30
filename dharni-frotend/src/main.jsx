import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
 
      <BrowserRouter>
        <App />
      </BrowserRouter>
  
  </AuthProvider>
)
