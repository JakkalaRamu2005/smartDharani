import React, { useState } from 'react';

const ContactModal = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.buyerEmail || !formData.buyerPhone) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact Seller</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="product-info-modal">
          <h3>{product.produceName}</h3>
          <p className="price">₹{product.price}/{product.unit}</p>
          <p className="location">📍 {product.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email *</label>
            <input
              type="email"
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Phone Number *</label>
            <input
              type="tel"
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any specific requirements or questions?"
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">Send Inquiry</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
