const mongoose = require('mongoose');

const AdminOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isPasswordReset: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Document automatically deleted after 5 minutes (300 seconds)
    }
});

module.exports = mongoose.model('AdminOtp', AdminOtpSchema);
