const EssentialMedicine = require('../models/EssentialMedicine.js');
const createEssentialMed = async (req, res) => {
    const { name, description } = req.body;
    try {
        const medExists = await EssentialMedicine.findOne({ name });
        if (medExists) {
            return res.status(400).json({ message: 'Medicine already exists' });
        }
        const medicine = new EssentialMedicine({ name, description });
        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error) {
        res.status(400).json({ message: 'Error creating medicine', error: error.message });
    }
};

const getEssentialMeds = async (req, res) => {
    try {
        const medicines = await EssentialMedicine.find({});
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateEssentialMed = async (req, res) => {
    const { name, description } = req.body;
    try {
        const medicine = await EssentialMedicine.findById(req.params.id);
        if (medicine) {
            medicine.name = name || medicine.name;
            medicine.description = description || medicine.description;

            const updatedMedicine = await medicine.save();
            res.json(updatedMedicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating medicine', error: error.message });
    }
};
const deleteEssentialMed = async (req, res) => {
    try {
        const medicine = await EssentialMedicine.findById(req.params.id);
        if (medicine) {
            await medicine.deleteOne();
            res.json({ message: 'Medicine removed' });
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createEssentialMed,
    getEssentialMeds,
    updateEssentialMed,
    deleteEssentialMed,
};