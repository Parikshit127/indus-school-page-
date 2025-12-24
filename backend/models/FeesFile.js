const mongoose = require('mongoose');

const feesFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FeesFile', feesFileSchema);
