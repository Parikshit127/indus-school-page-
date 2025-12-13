const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherCode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    teacherType: {
        type: String,
        required: true // e.g., PGT, TGT, PRT
    },
    qualification: {
        type: String,
        required: true
    },
    classesTaught: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
