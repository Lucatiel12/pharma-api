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
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'EssentialMedicine', 
    },
    availableIn: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pharmacy',
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('AlternativeMedicine', alternativeMedicineSchema);