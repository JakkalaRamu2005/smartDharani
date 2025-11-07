import React, { useState } from 'react';
import ListingForm from './ListingForm';

import MarketplaceGrid from './MarketplaceGrid';
import './Marketplace.css';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'myListings'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCropType, setFilterCropType] = useState('All');
  const [filterPriceRange, setFilterPriceRange] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [showListingForm, setShowListingForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // Unique options for filters
  const cropTypes = ['All', 'Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize', 'Sugarcane', 'Groundnut', 'Vegetables'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹1000', value: '0-1000' },
    { label: '₹1000 - ₹5000', value: '1000-5000' },
    { label: '₹5000 - ₹10000', value: '5000-10000' },
    { label: 'Above ₹10000', value: '10000+' }
  ];
  const locations = ['All', 'Hyderabad', 'Warangal', 'Nalgonda', 'Karimnagar', 'Adilabad', 'Khammam', 'Medak', 'Rangareddy'];

  // Fetch listings from backend
  React.useEffect(() => {
    fetchListings();
    fetchUserListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9291/api/marketplace/listings');
      const data = await response.json();
      if (data.success) {
        setListings(data.data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    try {
      // In a real app, you'd get user ID from auth context
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await fetch(`http://localhost:9291/api/marketplace/listings/user/${userId}`);
        const data = await response.json();
        if (data.success) {
          setUserListings(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.produceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = filterCropType === 'All' || listing.cropType === filterCropType;
    const matchesLocation = filterLocation === 'All' || listing.location === filterLocation;
    const matchesPrice = matchesPrice(listing.price, filterPriceRange);
    return matchesSearch && matchesCrop && matchesLocation && matchesPrice;
  });

  const matchesPrice = (price, range) => {
    if (range === 'All') return true;
    if (range === '0-1000') return price <= 1000;
    if (range === '1000-5000') return price >= 1000 && price <= 5000;
    if (range === '5000-10000') return price >= 5000 && price <= 10000;
    if (range === '10000+') return price > 10000;
    return true;
  };

  const handleAddListing = async (formData) => {
    try {
      const userId = localStorage.getItem('userId');
      const payload = {
        ...formData,
        userId
      };

      const response = await fetch('http://localhost:9291/api/marketplace/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setShowListingForm(false);
        fetchListings();
        fetchUserListings();
      }
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`http://localhost:9291/api/marketplace/listings/${listingId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        fetchListings();
        fetchUserListings();
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handleContactSeller = (product) => {
    setSelectedProduct(product);
    setShowContactModal(true);
  };

  const handleSendInquiry = async (inquiryData) => {
    try {
      const payload = {
        ...inquiryData,
        listingId: selectedProduct.id,
        sellerId: selectedProduct.userId
      };

      const response = await fetch('http://localhost:9291/api/marketplace/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setShowContactModal(false);
        alert('Inquiry sent! Seller will contact you within 2 hours.');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
    }
  };

  return (
    <div className="marketplace-page">
      {/* Header */}
      <div className="marketplace-header">
        <h1 className="marketplace-title">🛒 Smart Dharani Marketplace</h1>
        <p className="marketplace-subtitle">
          Buy and sell agricultural produce directly from farmers
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          📦 Browse Marketplace
        </button>
        <button
          className={`tab-button ${activeTab === 'myListings' ? 'active' : ''}`}
          onClick={() => setActiveTab('myListings')}
        >
          📋 My Listings
        </button>
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="browse-section">
          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search for produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="filter-group">
              <label>Crop Type:</label>
              <select
                value={filterCropType}
                onChange={(e) => setFilterCropType(e.target.value)}
                className="filter-select"
              >
                {cropTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range:</label>
              <select
                value={filterPriceRange}
                onChange={(e) => setFilterPriceRange(e.target.value)}
                className="filter-select"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location:</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="filter-select"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCropType('All');
                setFilterPriceRange('All');
                setFilterLocation('All');
              }}
              className="reset-filters-btn"
            >
              🔄 Reset Filters
            </button>
          </div>

          {/* Listings Grid */}
          <MarketplaceGrid
            listings={filteredListings}
            loading={loading}
            onContact={handleContactSeller}
          />
        </div>
      )}

      {/* My Listings Tab */}
      {activeTab === 'myListings' && (
        <div className="my-listings-section">
          <div className="my-listings-header">
            <h2>Your Listings</h2>
            <button
              onClick={() => setShowListingForm(!showListingForm)}
              className="add-listing-btn"
            >
              {showListingForm ? '✕ Cancel' : '+ Add New Listing'}
            </button>
          </div>

          {showListingForm && (
            <ListingForm
              onSubmit={handleAddListing}
              onCancel={() => setShowListingForm(false)}
            />
          )}

          {userListings.length > 0 ? (
            <div className="user-listings-grid">
              {userListings.map(listing => (
                <div key={listing.id} className="user-listing-card">
                  <img src={listing.imageUrl} alt={listing.produceName} className="listing-image" />
                  <div className="listing-info">
                    <h3>{listing.produceName}</h3>
                    <p className="price">₹{listing.price}/{listing.unit}</p>
                    <p className="location">📍 {listing.location}</p>
                    <p className="quantity">Available: {listing.quantity} {listing.unit}</p>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-listings">
              <p>You haven't listed any products yet.</p>
              <button onClick={() => setShowListingForm(true)} className="add-listing-btn">
                + Add Your First Listing
              </button>
            </div>
          )}
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          product={selectedProduct}
          onSubmit={handleSendInquiry}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
};

export default Marketplace;
