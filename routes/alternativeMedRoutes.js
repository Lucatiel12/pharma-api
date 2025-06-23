const express = require('express');
const router = express.Router();
const {
    createAlternativeMed,
    getAlternativeMeds,
    updateAlternativeMed,
    deleteAlternativeMed,
} = require('../controllers/alternativeMedController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getAlternativeMeds).post(protect, createAlternativeMed);
router.route('/:id').put(protect, updateAlternativeMed).delete(protect, deleteAlternativeMed);

module.exports = router;