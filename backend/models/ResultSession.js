const mongoose = require('mongoose');

const resultBannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, { _id: false });

const resultSessionSchema = new mongoose.Schema({
    sessionLabel: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    banners: [resultBannerSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('ResultSession', resultSessionSchema);


