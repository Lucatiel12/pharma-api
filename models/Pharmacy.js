const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);