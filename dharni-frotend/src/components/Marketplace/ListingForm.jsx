import React, { useState } from 'react';

const ListingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    produceName: '',
    cropType: '',
    price: '',
    unit: 'kg',
    quantity: '',
    location: '',
    imageUrl: '',
    description: ''
  });

  const cropTypes = ['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize', 'Sugarcane', 'Groundnut', 'Vegetables'];
  const units = ['kg', 'quintal', 'ton', 'piece', 'liter', 'dozen'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.produceName || !formData.price || !formData.quantity || !formData.location) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
    setFormData({
      produceName: '',
      cropType: '',
      price: '',
      unit: 'kg',
      quantity: '',
      location: '',
      imageUrl: '',
      description: ''
    });
  };

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <h3>Add New Listing</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="produceName"
            value={formData.produceName}
            onChange={handleChange}
            placeholder="e.g., Fresh Tomatoes"
          />
        </div>

        <div className="form-group">
          <label>Crop Type</label>
          <select name="cropType" value={formData.cropType} onChange={handleChange}>
            <option value="">Select Crop Type</option>
            {cropTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="500"
          />
        </div>

        <div className="form-group">
          <label>Unit *</label>
          <select name="unit" value={formData.unit} onChange={handleChange}>
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity Available *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="10"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Your location"
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your product..."
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">Post Listing</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ListingForm;
