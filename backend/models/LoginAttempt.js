const mongoose = require('mongoose');

const LoginAttemptSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
});

module.exports = mongoose.model('LoginAttempt', LoginAttemptSchema);
