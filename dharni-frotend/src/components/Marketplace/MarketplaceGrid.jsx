import React from 'react';

const MarketplaceGrid = ({ listings, loading, onContact }) => {
  if (loading) {
    return <div className="loading">Loading listings...</div>;
  }

  if (listings.length === 0) {
    return (
      <div className="no-results">
        <p>🌾 No products found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="marketplace-grid">
      {listings.map(listing => (
        <div key={listing.id} className="product-card">
          <div className="product-image">
            <img src={listing.imageUrl || '/placeholder.jpg'} alt={listing.produceName} />
          </div>

          <div className="product-details">
            <h3 className="product-name">{listing.produceName}</h3>
            <p className="product-crop">{listing.cropType}</p>

            <div className="price-section">
              <span className="price">₹{listing.price}</span>
              <span className="unit">/{listing.unit}</span>
            </div>

            <p className="location">📍 {listing.location}</p>
            <p className="quantity">Available: {listing.quantity} {listing.unit}</p>

            {listing.description && (
              <p className="description">{listing.description.substring(0, 80)}...</p>
            )}

            <button
              onClick={() => onContact(listing)}
              className="contact-btn"
            >
              📞 Contact Seller
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketplaceGrid;
