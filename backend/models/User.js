const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please add a name'],
        trim: true, // removes whitespace from both ends
        maxlength: [50, 'Name cannot be more than 50 characters']
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

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function(next) {

    //if password not modified, skip hashing
    if (!this.isModified('password')) { 
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {

    //Return true if match
    return await bcrypt.compare(enteredPassword, this.password); 
};

module.exports = mongoose.model('User', userSchema);