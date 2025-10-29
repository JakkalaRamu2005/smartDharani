import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {AuthProvider} from "./components/context/AuthContext"

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />

    </AuthProvider>
)
