const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true // Father/Spouse Name
    },
    designation: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
