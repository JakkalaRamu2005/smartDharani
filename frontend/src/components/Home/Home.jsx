import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import VoiceModal from './VoiceModal.jsx'
import './home.css'

const languages = {
  en: { code: 'EN', name: 'English' },
  te: { code: 'తెలుగు', name: 'Telugu' },
  hi: { code: 'हिंदी', name: 'Hindi' }
}

const content = {
  en: {
    nav: { 
      home: 'Home', 
      services: 'Services', 
      learn: 'Learn', 
      dashboard: 'Dashboard', 
      signin: 'Sign In' 
    },
    hero: {
      title: 'Smart Dharani — Your AI Friend for Farming',
      subtitle: 'Ask anything about crops, weather, or schemes — in your own language.',
      primaryCta: 'Talk to Dharani',
      secondaryCta: 'Watch Demo',
      note: 'Works in Telugu, Hindi & English • No typing needed.'
    }
  },
  te: {
    nav: { 
      home: 'హోమ్', 
      services: 'సేవలు', 
      learn: 'నేర్చుకోండి', 
      dashboard: 'డాష్‌బోర్డ్', 
      signin: 'సైన్ ఇన్' 
    },
    hero: {
      title: 'స్మార్ట్ ధరణి — మీ వ్యవసాయ AI మిత్రుడు',
      subtitle: 'పంటలు, వాతావరణం లేదా పథకాల గురించి మీ భాషలో అడగండి.',
      primaryCta: 'ధరణితో మాట్లాడండి',
      secondaryCta: 'డెమో చూడండి',
      note: 'తెలుగు, హిందీ & ఇంగ్లీష్‌లో పనిచేస్తుంది • టైపింగ్ అవసరం లేదు.'
    }
  },
  hi: {
    nav: { 
      home: 'होम', 
      services: 'सेवाएं', 
      learn: 'सीखें', 
      dashboard: 'डैशबोर्ड', 
      signin: 'साइन इन' 
    },
    hero: {
      title: 'स्मार्ट धरणी — आपका कृषि AI मित्र',
      subtitle: 'फसलों, मौसम या योजनाओं के बारे में अपनी भाषा में पूछें।',
      primaryCta: 'धरणी से बात करें',
      secondaryCta: 'डेमो देखें',
      note: 'तेलुगु, हिंदी और अंग्रेजी में काम करता है • टाइपिंग की जरूरत नहीं।'
    }
  }
}

function App() {
  const [currentLang, setCurrentLang] = useState('en')
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)

  const handleVoiceClick = () => {
    setIsVoiceModalOpen(true)
  }

  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false)
  }

  return (
    <div className="app">
      <Navbar 
        content={content[currentLang]}
        languages={languages}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        onVoiceClick={handleVoiceClick}
      />
      <Hero 
        content={content[currentLang]}
        onVoiceClick={handleVoiceClick}
      />
      {isVoiceModalOpen && (
        <VoiceModal onClose={closeVoiceModal} />
      )}
    </div>
  )
}

export default App
