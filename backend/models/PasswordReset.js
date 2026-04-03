const mongoose = require('mongoose');

//Define schema for password reset tokens
const passwordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, //must have email associated with token
        lowercase: true
    },
    token: {
        type: String,
        required: true, //actual reset token
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => Date.now() + 3600000 // Auto-set to 1 hour
    },
    used: {
        type: Boolean,
        default: false //Track if token has already been used
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Auto-delete expired tokens
//expireAfterSeconds - documents expire exactly at the expiresAt time
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('PasswordReset', passwordResetSchema);