const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please add a name'],
        trim: true, // removes whitespace from both ends
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    zipCode: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true, 
        match: [ // regex validation for email format
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // exclude password from queries by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'], //only allows
        default: 'user' // default role is user
    },
    profilePicture: {
        type: String,
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date, 
        default: Date.now // automatically sets current date
    }
});

module.exports = mongoose.model('User', userSchema);