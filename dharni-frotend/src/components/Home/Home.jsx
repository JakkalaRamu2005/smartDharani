import { useState } from 'react'
import { Mic, Play, X, Volume2 } from 'lucide-react'
import './home.css'
import PostFeed from '../Posts/PostFeed'

const languages = {
  en: { code: 'EN', name: 'English' },
  te: { code: 'తెలుగు', name: 'Telugu' },
  hi: { code: 'हिंदी', name: 'Hindi' }
}

const content = {
  en: {
    hero: {
      title: 'Smart Dharani — Your AI Friend for Farming',
      subtitle: 'Ask anything about crops, weather, or schemes — in your own language.',
      primaryCta: 'Talk to Dharani',
      secondaryCta: 'Watch Demo',
      note: 'Works in Telugu, Hindi & English • No typing needed.'
    }
  },
  te: {
    hero: {
      title: 'స్మార్ట్ ధరణి — మీ వ్యవసాయ AI మిత్రుడు',
      subtitle: 'పంటలు, వాతావరణం లేదా పథకాల గురించి మీ భాషలో అడగండి.',
      primaryCta: 'ధరణితో మాట్లాడండి',
      secondaryCta: 'డెమో చూడండి',
      note: 'తెలుగు, హిందీ & ఇంగ్లీష్‌లో పనిచేస్తుంది • టైపింగ్ అవసరం లేదు.'
    }
  },
  hi: {
    hero: {
      title: 'स्मार्ट धरणी — आपका कृषि AI मित्र',
      subtitle: 'फसलों, मौसम या योजनाओं के बारे में अपनी भाषा में पूछें।',
      primaryCta: 'धरणी से बात करें',
      secondaryCta: 'डेमो देखें',
      note: 'तेलुगु, हिंदी और अंग्रेजी में काम करता है • टाइपिंग की जरूरत नहीं।'
    }
  }
}

// Hero Component
const Hero = ({ content, onVoiceClick }) => {
  const handleWatchDemo = () => {
    alert('Demo video would open here')
  }

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1>{content.hero.title}</h1>
        <p>{content.hero.subtitle}</p>
        
        <div className="cta-buttons">
          <button className="btn-primary" onClick={onVoiceClick}>
            <Mic size={20} />
            {content.hero.primaryCta}
          </button>
          <button className="btn-secondary" onClick={handleWatchDemo}>
            <Play size={20} />
            {content.hero.secondaryCta}
          </button>
        </div>
        
        <p className="hero-note">{content.hero.note}</p>
        
        <div className="mic-pulse" onClick={onVoiceClick}>
          <Mic size={32} />
        </div>
      </div>
    </section>
  )
}

// Voice Modal Component
const VoiceModal = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleMicClick = () => {
    setIsListening(true)
    setTranscript('')
    setAiResponse('')
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setTranscript('When should I irrigate my paddy?')
      
      // Simulate AI response
      setTimeout(() => {
        setAiResponse('Based on your location in Guntur district, irrigate your paddy 2-3 days after the water level drops below the soil surface. With current weather conditions, irrigation is recommended every 5-7 days. Avoid over-watering to prevent pest issues.')
      }, 1500)
    }, 2000)
  }

  const handleSave = () => {
    alert('Response saved!')
  }

  const handleShare = () => {
    alert('Sharing via SMS...')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2>Talk to Dharani</h2>
        
        <div className="voice-widget">
          <div className="voice-controls">
            <button 
              className={`voice-mic ${isListening ? 'listening' : ''}`}
              onClick={handleMicClick}
              aria-label="Start voice input"
            >
              <Mic size={24} />
            </button>
            <input 
              type="text" 
              className="voice-input" 
              placeholder="Or type your question here..."
            />
          </div>
          
          {isListening && (
            <div className="transcript-box">
              <p className="listening-text">Listening...</p>
            </div>
          )}
          
          {transcript && !isListening && (
            <div className="transcript-box">
              <p><strong>You asked:</strong> {transcript}</p>
            </div>
          )}
          
          {aiResponse && (
            <div className="response-box">
              <div className="audio-control">
                <Volume2 size={20} />
                <span>Play audio response</span>
              </div>
              <p>{aiResponse}</p>
              <div className="action-buttons">
                <button className="btn-save" onClick={handleSave}>Save</button>
                <button className="btn-share" onClick={handleShare}>Share SMS</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Home Component
function Home({ currentLang, setCurrentLang, languages: langs }) {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [localLang, setLocalLang] = useState(currentLang || 'en')

  const handleVoiceClick = () => {
    setIsVoiceModalOpen(true)
  }

  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false)
  }

  const activeLang = currentLang || localLang

  return (
    <div className="home-page">
      {/* <Hero 
        content={content[activeLang]}
        onVoiceClick={handleVoiceClick}
      />
      {isVoiceModalOpen && (
        <VoiceModal onClose={closeVoiceModal} />
      )} */}
       <PostFeed />
    </div>
  )
}

export default Home