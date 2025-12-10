const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Please add student name']
    },
    parentName: {
        type: String,
        required: [true, 'Please add parent name']
    },
    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    class: {
        type: String,
        required: [true, 'Please select a class']
    },
    message: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
