const express = require('express');
const router = express.Router();
const {
    createEssentialMed,
    getEssentialMeds,
    updateEssentialMed,
    deleteEssentialMed,
} = require('../controllers/essentialMedController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getEssentialMeds).post(protect, createEssentialMed);
router
    .route('/:id')
    .put(protect, updateEssentialMed)
    .delete(protect, deleteEssentialMed);

module.exports = router;