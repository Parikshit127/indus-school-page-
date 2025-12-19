const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    excerpt: {
        type: String,
        trim: true,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['announcement', 'achievement', 'news', 'notice'],
        default: 'news'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('NewsEvent', newsEventSchema);


