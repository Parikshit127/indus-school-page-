const mongoose = require('mongoose');

const achievementBannerSchema = new mongoose.Schema({
    title: { type: String },
    imageUrl: { type: String, required: true },
    publicId: { type: String }, // Cloudinary public_id
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('AchievementBanner', achievementBannerSchema);
