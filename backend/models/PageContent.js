const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        unique: true,
        enum: ['hero']
    },
    data: {
        hero: {
            slides: [{
                type: { type: String, enum: ['image', 'video'], default: 'image' },
                url: { type: String, required: true }
            }],
            announcement: {
                text: { type: String, default: 'Admissions Open for 2024-25' },
                isActive: { type: Boolean, default: true },
                link: { type: String, default: '/#admissions' }
            },
            admission: {
                deadline: { type: String, default: '31st March 2024' },
                gradesOpen: { type: String, default: 'Nursery to XII' },
                ctaText: { type: String, default: 'Apply Now' }
            },
            stats: {
                years: { type: Number, default: 25 },
                students: { type: Number, default: 2500 },
                teachers: { type: Number, default: 150 },
                boardResults: { type: String, default: '100%' }
            }
        }
    },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PageContent', pageContentSchema);
