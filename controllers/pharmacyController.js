// controllers/pharmacyController.js

const Pharmacy = require('../models/Pharmacy.js');

// @desc    Create a new pharmacy
// @route   POST /api/pharmacies
// @access  Private/Admin
const createPharmacy = async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        const pharmacy = new Pharmacy({ name, address, phone });
        const createdPharmacy = await pharmacy.save();
        res.status(201).json(createdPharmacy);
    } catch (error) {
        res.status(400).json({ message: 'Error creating pharmacy', error: error.message });
    }
};

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public
const getPharmacies = async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find({});
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a pharmacy
// @route   PUT /api/pharmacies/:id
// @access  Private/Admin
const updatePharmacy = async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if (pharmacy) {
            pharmacy.name = name || pharmacy.name;
            pharmacy.address = address || pharmacy.address;
            pharmacy.phone = phone || pharmacy.phone;

            const updatedPharmacy = await pharmacy.save();
            res.json(updatedPharmacy);
        } else {
            res.status(404).json({ message: 'Pharmacy not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating pharmacy', error: error.message });
    }
};

// @desc    Delete a pharmacy
// @route   DELETE /api/pharmacies/:id
// @access  Private/Admin
const deletePharmacy = async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if (pharmacy) {
            await pharmacy.deleteOne();
            res.json({ message: 'Pharmacy removed' });
        } else {
            res.status(404).json({ message: 'Pharmacy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createPharmacy,
    getPharmacies,
    updatePharmacy,
    deletePharmacy,
};