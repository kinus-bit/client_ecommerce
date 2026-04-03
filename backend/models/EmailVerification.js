const mongoose = require('mongoose');

//Define schema for email verification tokens
const emailVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => Date.now() + (process.env.VERIFICATION_TOKEN_EXPIRE || 86400) * 1000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Auto-delete expired tokens
emailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);