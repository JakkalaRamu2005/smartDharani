import { useState } from 'react'
import { Leaf, Mic, Menu, X } from 'lucide-react'

const Navbar = ({ content, languages, currentLang, setCurrentLang, onVoiceClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Leaf size={32} />
          <span>Smart Dharani</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <ul className="nav-links">
            <li><a href="#home">{content.nav.home}</a></li>
            <li><a href="#services">{content.nav.services}</a></li>
            <li><a href="#learn">{content.nav.learn}</a></li>
            <li><a href="#dashboard">{content.nav.dashboard}</a></li>
            <li><a href="#signin">{content.nav.signin}</a></li>
          </ul>

          {/* Language Toggle */}
          <div className="lang-toggle">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                className={`lang-btn ${currentLang === code ? 'active' : ''}`}
                onClick={() => setCurrentLang(code)}
              >
                {lang.code}
              </button>
            ))}
          </div>

          {/* Voice Button */}
          <button 
            className="mic-button-nav" 
            onClick={onVoiceClick}
            aria-label="Talk to Dharani"
          >
            <Mic size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="nav-mobile">
          <ul className="nav-links-mobile">
            <li><a href="#home" onClick={toggleMenu}>{content.nav.home}</a></li>
            <li><a href="#services" onClick={toggleMenu}>{content.nav.services}</a></li>
            <li><a href="#learn" onClick={toggleMenu}>{content.nav.learn}</a></li>
            <li><a href="#dashboard" onClick={toggleMenu}>{content.nav.dashboard}</a></li>
            <li><a href="#signin" onClick={toggleMenu}>{content.nav.signin}</a></li>
          </ul>
          
          <div className="lang-toggle-mobile">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                className={`lang-btn ${currentLang === code ? 'active' : ''}`}
                onClick={() => setCurrentLang(code)}
              >
                {lang.code}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
