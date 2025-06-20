// routes/essentialMedRoutes.js

const express = require('express');
const router = express.Router();
const {
    createEssentialMed,
    getEssentialMeds,
    updateEssentialMed,
    deleteEssentialMed,
} = require('../controllers/essentialMedController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Public route to get all medicines
// Private route to create a new one
router.route('/').get(getEssentialMeds).post(protect, createEssentialMed);

// Private routes to update or delete a specific medicine
router
    .route('/:id')
    .put(protect, updateEssentialMed)
    .delete(protect, deleteEssentialMed);

module.exports = router;