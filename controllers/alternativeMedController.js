const AlternativeMedicine = require('../models/AlternativeMedicine.js');

const createAlternativeMed = async (req, res) => {
    const { name, description, essentialMedicine, availableIn } = req.body;
    try {
        const medicine = new AlternativeMedicine({
            name,
            description,
            essentialMedicine, 
            availableIn,       
        });
        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error) {
        res.status(400).json({ message: 'Error creating alternative medicine', error: error.message });
    }
};
const getAlternativeMeds = async (req, res) => {
    try {
        const medicines = await AlternativeMedicine.find({})
            .populate('essentialMedicine', 'name description') 
            .populate('availableIn', 'name address phone'); 

        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
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