const express = require('express');
const router = express.Router();
const {
    createPharmacy,
    getPharmacies,
    updatePharmacy,
    deletePharmacy,
} = require('../controllers/pharmacyController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getPharmacies).post(protect, createPharmacy);
router
    .route('/:id')
    .put(protect, updatePharmacy)
    .delete(protect, deletePharmacy);

module.exports = router;