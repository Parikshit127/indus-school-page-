const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['photo', 'video']
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Unified Gallery Item'
    },
    category: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
