import { useState } from 'react'
import { Mic, X, Volume2 } from 'lucide-react'

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

export default VoiceModal
