const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Please add student name']
    },

    fatherName: {
        type: String,
        required: [true, 'Please add father\'s name']
    },
    city: {
        type: String,
        required: [true, 'Please add city']
    },
    state: {
        type: String,
        required: [true, 'Please add state']
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
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Admitted', 'Closed'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
