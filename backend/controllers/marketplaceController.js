import db from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    // ✅ FIX: Use db.execute() instead of db.query()
    const [listings] = await db.execute(
      'SELECT * FROM marketplace_listings WHERE is_active = 1 ORDER BY created_at DESC'
    );
    
    // ✅ FIX: Transform snake_case to camelCase for frontend
    const transformedListings = listings.map(listing => ({
      id: listing.id,
      userId: listing.user_id,
      produceName: listing.produce_name,
      cropType: listing.crop_type,
      price: listing.price,
      unit: listing.unit,
      quantity: listing.quantity,
      location: listing.location,
      imageUrl: listing.image_url,
      description: listing.description,
      isActive: listing.is_active,
      createdAt: listing.created_at,
      updatedAt: listing.updated_at
    }));
    
    console.log('✅ Fetched', transformedListings.length, 'listings');
    
    res.status(200).json({
      success: true,
      data: transformedListings
    });
  } catch (error) {
    console.error('❌ Error fetching listings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch listings',
      error: error.message
    });
  }
};

// Get user listings
export const getUserListings = async (req, res) => {
  try {
    const { userId } = req.params;

    const [listings] = await db.execute(
      'SELECT * FROM marketplace_listings WHERE user_id = ? AND is_active = 1 ORDER BY created_at DESC',
      [userId]
    );

    // Transform to camelCase
    const transformedListings = listings.map(listing => ({
      id: listing.id,
      userId: listing.user_id,
      produceName: listing.produce_name,
      cropType: listing.crop_type,
      price: listing.price,
      unit: listing.unit,
      quantity: listing.quantity,
      location: listing.location,
      imageUrl: listing.image_url,
      description: listing.description,
      isActive: listing.is_active,
      createdAt: listing.created_at,
      updatedAt: listing.updated_at
    }));

    console.log('✅ Fetched', transformedListings.length, 'user listings for userId:', userId);

    res.status(200).json({
      success: true,
      data: transformedListings
    });
  } catch (error) {
    console.error('❌ Error fetching user listings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user listings',
      error: error.message
    });
  }
};

// Create listing
export const createListing = async (req, res) => {
  try {
    const {
      userId,
      produceName,
      cropType,
      price,
      unit,
      quantity,
      location,
      imageUrl,
      description
    } = req.body;

    console.log('📝 Creating listing:', { userId, produceName, price, quantity });

    if (!produceName || !price || !quantity || !location || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO marketplace_listings 
       (user_id, produce_name, crop_type, price, unit, quantity, location, image_url, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, produceName, cropType, price, unit, quantity, location, imageUrl, description]
    );

    console.log('✅ Listing created with ID:', result.insertId);

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: {
        id: result.insertId,
        userId,
        produceName,
        cropType,
        price,
        unit,
        quantity,
        location,
        imageUrl,
        description
      }
    });
  } catch (error) {
    console.error('❌ Error creating listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create listing',
      error: error.message
    });
  }
};

// Delete listing
export const deleteListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    console.log('🗑️ Deleting listing:', listingId);

    const [result] = await db.execute(
      'UPDATE marketplace_listings SET is_active = 0 WHERE id = ?',
      [listingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    console.log('✅ Listing deleted');

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete listing',
      error: error.message
    });
  }
};

// Create inquiry
export const createInquiry = async (req, res) => {
  try {
    const {
      listingId,
      sellerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message
    } = req.body;

    if (!listingId || !sellerId || !buyerName || !buyerEmail || !buyerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO marketplace_inquiries 
       (listing_id, seller_id, buyer_name, buyer_email, buyer_phone, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [listingId, sellerId, buyerName, buyerEmail, buyerPhone, message]
    );

    console.log('✅ Inquiry created with ID:', result.insertId);

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully. Seller will contact within 2 hours.',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    console.error('❌ Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send inquiry',
      error: error.message
    });
  }
};

// Get seller inquiries
export const getSellerInquiries = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const [inquiries] = await db.execute(
      'SELECT * FROM marketplace_inquiries WHERE seller_id = ? ORDER BY created_at DESC',
      [sellerId]
    );

    res.status(200).json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    console.error('❌ Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: error.message
    });
  }
};
