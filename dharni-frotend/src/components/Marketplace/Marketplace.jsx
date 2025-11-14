import React, { useState, useContext } from 'react'; // ✅ Add useContext
import ListingForm from './ListingForm';
import MarketplaceGrid from './MarketplaceGrid';
import ContactModal from './contactModal';
import { AuthContext } from '../context/AuthContext'; // ✅ Import AuthContext
import './Marketplace.css';

const Marketplace = () => {
  const { userId } = useContext(AuthContext); // ✅ Get userId from AuthContext
  
  const [activeTab, setActiveTab] = useState('browse');
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

  const cropTypes = ['All', 'Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize', 'Sugarcane', 'Groundnut', 'Vegetables'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹1000', value: '0-1000' },
    { label: '₹1000 - ₹5000', value: '1000-5000' },
    { label: '₹5000 - ₹10000', value: '5000-10000' },
    { label: 'Above ₹10000', value: '10000+' }
  ];
  const locations = ['All', 'Hyderabad', 'Warangal', 'Nalgonda', 'Karimnagar', 'Adilabad', 'Khammam', 'Medak', 'Rangareddy'];

  React.useEffect(() => {
    fetchListings();
    if (userId) { // ✅ Only fetch if userId exists
      fetchUserListings();
    }
  }, [userId]); // ✅ Re-fetch when userId changes

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://smartdharani.onrender.com/api/marketplace/listings');
      const data = await response.json();
      if (data.success) {
        setListings(data.data);
        console.log('✅ Fetched', data.data.length, 'listings');
      }
    } catch (error) {
      console.error('❌ Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    try {
      // ✅ Use userId from AuthContext instead of localStorage
      if (!userId) {
        console.log('⚠️ No userId found, skipping user listings fetch');
        return;
      }

      console.log('📋 Fetching user listings for userId:', userId);
      
      const response = await fetch(`https://smartdharani.onrender.com/api/marketplace/listings/user/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setUserListings(data.data);
        console.log('✅ Fetched', data.data.length, 'user listings');
      }
    } catch (error) {
      console.error('❌ Error fetching user listings:', error);
    }
  };

  const checkPriceMatch = (price, range) => {
    if (range === 'All') return true;
    if (range === '0-1000') return price <= 1000;
    if (range === '1000-5000') return price >= 1000 && price <= 5000;
    if (range === '5000-10000') return price >= 5000 && price <= 10000;
    if (range === '10000+') return price > 10000;
    return true;
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.produceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = filterCropType === 'All' || listing.cropType === filterCropType;
    const matchesLocation = filterLocation === 'All' || listing.location === filterLocation;
    const matchesPrice = checkPriceMatch(listing.price, filterPriceRange);
    return matchesSearch && matchesCrop && matchesLocation && matchesPrice;
  });

  const handleAddListing = async (formData) => {
    try {
      // ✅ Use userId from AuthContext
      if (!userId) {
        alert('Please login to add a listing');
        return;
      }

      const payload = {
        ...formData,
        userId // ✅ Use userId from AuthContext
      };

      console.log('📝 Adding listing with payload:', payload);

      const response = await fetch('https://smartdharani.onrender.com/api/marketplace/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Listing added successfully');
        setShowListingForm(false);
        await fetchListings(); // Refresh all listings
        await fetchUserListings(); // Refresh user listings
        alert('✅ Listing added successfully!');
      } else {
        console.error('❌ Failed to add listing:', data.message);
        alert('Failed to add listing: ' + data.message);
      }
    } catch (error) {
      console.error('❌ Error adding listing:', error);
      alert('Error adding listing. Please try again.');
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`https://smartdharani.onrender.com/api/marketplace/listings/${listingId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Listing deleted');
        await fetchListings();
        await fetchUserListings();
        alert('✅ Listing deleted successfully!');
      }
    } catch (error) {
      console.error('❌ Error deleting listing:', error);
      alert('Error deleting listing. Please try again.');
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

      const response = await fetch('https://smartdharani.onrender.com/api/marketplace/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowContactModal(false);
        alert('✅ Inquiry sent! Seller will contact you within 2 hours.');
      }
    } catch (error) {
      console.error('❌ Error sending inquiry:', error);
      alert('Error sending inquiry. Please try again.');
    }
  };

  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <h1 className="marketplace-title">🛒 Smart Dharani Marketplace</h1>
        <p className="marketplace-subtitle">
          Buy and sell agricultural produce directly from farmers
        </p>
      </div>

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

      {activeTab === 'browse' && (
        <div className="browse-section">
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

          <MarketplaceGrid
            listings={filteredListings}
            loading={loading}
            onContact={handleContactSeller}
          />
        </div>
      )}

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
                  <img 
                    src={listing.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={listing.produceName} 
                    className="listing-image" 
                  />
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
