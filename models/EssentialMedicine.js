const mongoose = require('mongoose');

const essentialMedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('EssentialMedicine', essentialMedicineSchema);