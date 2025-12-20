const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // For ordering/key
    studentName: { type: String, required: true },
    achievement: { type: String, required: true },
    category: { type: String, default: 'General' }, // Academic, Sports, Cultural
    class: { type: String }, // Class of student
    date: { type: Date, default: Date.now },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
