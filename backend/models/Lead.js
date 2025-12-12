const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    class: { type: String, required: true },
    message: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'New' } // New, Contacted, Enrolled, Closed
});

module.exports = mongoose.model('Lead', LeadSchema);
