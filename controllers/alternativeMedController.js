// controllers/alternativeMedController.js

const AlternativeMedicine = require('../models/AlternativeMedicine.js');
// @desc    Create a new alternative medicine
// @route   POST /api/alternative-medicines
// @access  Private/Admin
const createAlternativeMed = async (req, res) => {
    // We expect the name, the ID of the essential med, and an array of pharmacy IDs
    const { name, description, essentialMedicine, availableIn } = req.body;
    try {
        const medicine = new AlternativeMedicine({
            name,
            description,
            essentialMedicine, // The ID of the medicine it replaces
            availableIn,       // An array of Pharmacy IDs where it's stocked
        });
        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error) {
        res.status(400).json({ message: 'Error creating alternative medicine', error: error.message });
    }
};

// @desc    Get all alternative medicines
// @route   GET /api/alternative-medicines
// @access  Public
const getAlternativeMeds = async (req, res) => {
    try {
        // --- THIS IS THE MAGIC! ---
        // We use .populate() to automatically replace the stored IDs with the actual data from other collections.
        const medicines = await AlternativeMedicine.find({})
            .populate('essentialMedicine', 'name description') // Get the name and description from the EssentialMedicine model
            .populate('availableIn', 'name address phone'); // Get name, address, and phone from the Pharmacy model

        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update an alternative medicine
// @route   PUT /api/alternative-medicines/:id
// @access  Private/Admin
const updateAlternativeMed = async (req, res) => {
    const { name, description, essentialMedicine, availableIn } = req.body;
    try {
        const medicine = await AlternativeMedicine.findById(req.params.id);
        if (medicine) {
            medicine.name = name || medicine.name;
            medicine.description = description || medicine.description;
            medicine.essentialMedicine = essentialMedicine || medicine.essentialMedicine;
            medicine.availableIn = availableIn || medicine.availableIn;

            const updatedMedicine = await medicine.save();
            // We also populate the response here for immediate feedback
            const populatedMedicine = await AlternativeMedicine.findById(updatedMedicine._id)
                .populate('essentialMedicine', 'name description')
                .populate('availableIn', 'name address phone');
            
            res.json(populatedMedicine);
        } else {
            res.status(404).json({ message: 'Alternative medicine not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating alternative medicine', error: error.message });
    }
};

// @desc    Delete an alternative medicine
// @route   DELETE /api/alternative-medicines/:id
// @access  Private/Admin
const deleteAlternativeMed = async (req, res) => {
    try {
        const medicine = await AlternativeMedicine.findById(req.params.id);
        if (medicine) {
            await medicine.deleteOne();
            res.json({ message: 'Alternative medicine removed' });
        } else {
            res.status(404).json({ message: 'Alternative medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createAlternativeMed,
    getAlternativeMeds,
    updateAlternativeMed,
    deleteAlternativeMed,
};