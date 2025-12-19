const mongoose = require('mongoose');

const popupBannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PopupBanner', popupBannerSchema);
