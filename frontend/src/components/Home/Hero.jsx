import { Mic, Play } from 'lucide-react'

const Hero = ({ content, onVoiceClick }) => {
  const handleWatchDemo = () => {
    // Demo video modal functionality can be added later
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

export default Hero
