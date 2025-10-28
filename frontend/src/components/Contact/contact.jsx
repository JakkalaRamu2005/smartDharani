import React, { useState } from 'react';
import { Mic, MessageCircle, Phone, Mail, MapPin, ChevronDown, Send } from 'lucide-react';
import './contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      icon: '🎤',
      question: 'How do I talk to Dharani using voice?',
      answer: 'Simply click on the microphone button on any page and speak your question in Telugu, Hindi, or English. Dharani will understand and respond to you.'
    },
    {
      icon: '🌾',
      question: 'Can I get crop advice in my local language?',
      answer: 'Yes! Smart Dharani supports Telugu, Hindi, and English. You can ask questions and receive advice in your preferred language.'
    },
    {
      icon: '☁️',
      question: 'Does Smart Dharani work offline?',
      answer: 'Smart Dharani works best with internet connection. However, you can save important advice and access it offline anytime.'
    },
    {
      icon: '💰',
      question: 'How can I check market prices?',
      answer: 'Go to the Services page and click on "Market Price Updates" to see daily mandi prices for your region.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', location: '', message: '' });
    }, 3000);
  };

  const handleVoiceInput = () => {
    alert('Voice input feature will be activated');
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content-contact">
          <h1>We're Here to Help 🌾</h1>
          <p>Have a question or need help with Smart Dharani? Our team is ready to guide you.</p>
          <button className="ask-dharani-btn-hero">
            <Mic size={20} />
            Ask Dharani Now
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Left Side - Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <p className="form-subtitle">We'll get back to you within 24 hours</p>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You! 🌿</h3>
                <p>Our team will reach out to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Village / Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your village or city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your question or message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    <Send size={20} />
                    Submit Message
                  </button>
                  <button type="button" className="voice-btn" onClick={handleVoiceInput}>
                    <Mic size={20} />
                    Voice Input
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side - Quick Contact Options */}
          <div className="contact-options-section">
            <h2>Quick Contact</h2>
            <p className="options-subtitle">Reach us through your preferred method</p>

            <div className="contact-options">
              <a href="https://wa.me/1234567890" className="contact-option whatsapp">
                <MessageCircle size={32} />
                <div className="option-text">
                  <h3>WhatsApp</h3>
                  <p>Chat instantly</p>
                </div>
              </a>

              <a href="tel:18001234567" className="contact-option phone">
                <Phone size={32} />
                <div className="option-text">
                  <h3>Toll-Free</h3>
                  <p>1800-XXX-XXXX</p>
                </div>
              </a>

              <a href="mailto:support@smartdharani.ai" className="contact-option email">
                <Mail size={32} />
                <div className="option-text">
                  <h3>Email</h3>
                  <p>support@smartdharani.ai</p>
                </div>
              </a>
            </div>

            {/* Impact Map */}
            <div className="impact-map">
              <h3>
                <MapPin size={24} />
                Smart Dharani Impact Centers
              </h3>
              <div className="map-placeholder">
                <div className="map-visual">
                  🗺️
                  <p>Serving farmers across</p>
                  <div className="regions">
                    <span>Telangana</span>
                    <span>Andhra Pradesh</span>
                    <span>Karnataka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">Quick answers to common questions</p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-icon">{faq.icon}</span>
                  <span className="faq-text">{faq.question}</span>
                  <ChevronDown 
                    size={24} 
                    className={`chevron ${expandedFaq === index ? 'rotated' : ''}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="cta-content-contact">
          <h2>Still Have Questions?</h2>
          <p>Our team is here to help you grow smarter</p>
          <div className="cta-buttons-contact">
            <button className="cta-primary-contact">
              <Mic size={20} />
              Ask Dharani Now
            </button>
            <button className="cta-secondary-contact">
              <Phone size={20} />
              Talk to Our Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;