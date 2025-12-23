const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['admission', 'event', 'achievement', 'notice', 'other'],
        default: 'notice'
    },
    link: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Announcement', announcementSchema);
