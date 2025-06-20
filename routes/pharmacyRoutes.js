// routes/pharmacyRoutes.js

const express = require('express');
const router = express.Router();
const {
    createPharmacy,
    getPharmacies,
    updatePharmacy,
    deletePharmacy,
} = require('../controllers/pharmacyController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Anyone can view all pharmacies (GET is public)
// Only a protected user (admin) can create one (POST is private)
router.route('/').get(getPharmacies).post(protect, createPharmacy);

// Routes for a specific pharmacy by its ID
// Updating and Deleting are private
router
    .route('/:id')
    .put(protect, updatePharmacy)
    .delete(protect, deletePharmacy);

module.exports = router;