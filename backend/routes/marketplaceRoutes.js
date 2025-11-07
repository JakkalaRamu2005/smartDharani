import express from 'express';
import {
  getAllListings,
  getUserListings,
  createListing,
  deleteListing,
  createInquiry,
  getSellerInquiries
} from '../controllers/marketplaceController.js';

const router = express.Router();

// Listings routes
router.get('/listings', getAllListings);
router.get('/listings/user/:userId', getUserListings);
router.post('/listings', createListing);
router.delete('/listings/:listingId', deleteListing);

// Inquiries routes
router.post('/inquiries', createInquiry);
router.get('/inquiries/:sellerId', getSellerInquiries);

export default router;
