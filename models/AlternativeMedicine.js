const mongoose = require('mongoose');

const alternativeMedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    essentialMedicine: {
        type: mongoose.Schema.Types.ObjectId, // Stores the ID of an EssentialMedicine
        required: true,
        ref: 'EssentialMedicine', // Specifies which model to link to
    },
    // This creates a list of links to Pharmacy documents
    availableIn: [{
        type: mongoose.Schema.Types.ObjectId, // An array of Pharmacy IDs
        ref: 'Pharmacy', // Specifies which model to link to
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('AlternativeMedicine', alternativeMedicineSchema);