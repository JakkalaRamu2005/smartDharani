import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send data to backend API
            const response = await fetch('http://localhost:9291/api/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Form submitted successfully:', data);
                setIsSubmitted(true);

                // Reset form after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: ''
                    });
                }, 3000);
            } else {
                console.error(' Submission failed:', data.message);
                alert(data.message || 'Failed to send message. Please try again.');
            }

        } catch (error) {
            console.error(' Error submitting form:', error);
            alert('Failed to send message. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1 className="contact-title">📞 Contact Us</h1>
                <p className="contact-subtitle">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="contact-container">
                {/* Contact Information */}
                <div className="contact-info-section">
                    <h2 className="info-title">Get in Touch</h2>
                    <p className="info-text">
                        Feel free to reach out to us through any of the following channels:
                    </p>

                    <div className="info-cards">
                        <div className="info-card">
                            <div className="info-icon">📧</div>
                            <h3 className="info-card-title">Email</h3>
                            <p className="info-card-text">support@smartdharani.com</p>
                            <p className="info-card-text">info@smartdharani.com</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📱</div>
                            <h3 className="info-card-title">Phone</h3>
                            <p className="info-card-text">+91 1234567890</p>
                            <p className="info-card-text">Mon-Sat: 9AM - 6PM</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <h3 className="info-card-title">Address</h3>
                            <p className="info-card-text">Smart Dharani HQ</p>
                            <p className="info-card-text">Hyderabad, Telangana, India</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <h3 className="social-title">Follow Us</h3>
                        <div className="social-icons">
                            <a href="#" className="social-icon">🔗 LinkedIn</a>
                            <a href="#" className="social-icon">📘 Facebook</a>
                            <a href="#" className="social-icon">🐦 Twitter</a>
                            <a href="https://whatsapp.com/channel/0029VbAaBKrDp2Q5lwqJv00u" target="_blank" rel="noopener noreferrer" className="social-icon">
                                💬 WhatsApp Channel
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <h2 className="form-title">Send us a Message</h2>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 1234567890"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    rows="6"
                                    required
                                    className="form-textarea"
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        ✉️ Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="success-message">
                            <div className="success-icon">✅</div>
                            <h2 className="success-title">Thank You!</h2>
                            <p className="success-text">
                                Your message has been sent successfully. We'll get back to you within 24 hours.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
