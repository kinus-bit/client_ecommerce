const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const EmailVerification = require('../models/EmailVerification');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { sendEmail } = require('../config/mailer');
const { emailVerificationTemplate, emailVerifiedSuccessTemplate, passwordResetEmail, passwordResetSuccessEmail, welcomeEmail } = require('../utils/emailTemplates');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Generate email verification token
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (user, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verifyemail/${token}`;
    const emailHtml = emailVerificationTemplate(user.name, verificationUrl);
    
    await sendEmail({
        email: user.email,
        subject: 'Verify Your Email Address',
        html: emailHtml
    });
};

// @desc    Register user with email verification
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        // Check for validation errors from express-validator
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         success: false,
        //         errors: errors.array()  // Return detailed validation errors
        //     });
        // }

        //extract user input(destructuring)
        const { username, email, password } = req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:"All fields are required!!"})
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const gensalt = await  bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,gensalt);


        // Create new user in database
        const user = await User.create({
            name:username,
            email,
            password:hashedPassword,
            isEmailVerified: false
        });

         // Generate verification token
        const verificationToken = generateVerificationToken();
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        // Save verification token
        await EmailVerification.create({
            email: user.email,
            token: hashedToken,
            expiresAt: Date.now() + (process.env.VERIFICATION_TOKEN_EXPIRE || 86400) * 1000
        });

         // Send verification email
        try {
            await sendVerificationEmail(user, verificationToken);
        } catch (emailError) {
            console.log('Verification email could not be sent:', emailError);
            // Don't block registration if email fails
        }

        // Generate token for a new user
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture || null,
                isEmailVerified: user.isEmailVerified
            },
            message: 'Registration successful. Please verify your email address.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        console.log(token);
        if(!token){
            return res.status(400).json({message:"No token was passed!!!!"})
        }
        
        // Hash the token from URL to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        
        // Find valid verification token
        const verificationRecord = await EmailVerification.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() }
        });

        if (!verificationRecord) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        // Find user
        const user = await User.findOne({ email: verificationRecord.email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            });
        }

        // Update user email verification status
        user.isEmailVerified = true;
        await user.save();

        // Delete verification token
        await verificationRecord.deleteOne();

        // Send welcome email after verification
        try {
            const successHtml = emailVerifiedSuccessTemplate(user.name);
            await sendEmail({
                email: user.email,
                subject: 'Email Verified Successfully',
                html: successHtml
            });

            // Also send welcome email
            const welcomeHtml = welcomeEmail(user.name);
            await sendEmail({
                email: user.email,
                subject: 'Welcome to Our Platform!',
                html: welcomeHtml
            });
        } catch (emailError) {
            console.log('Welcome email could not be sent:', emailError);
        }

        res.status(200).json({
            success: true,
            message: 'Email verified successfully. You can now log in.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Eror',
            error: error.message
        });
    }
};

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email address'
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            });
        }

        // Delete any existing verification tokens for this user
        await EmailVerification.deleteMany({ email: user.email });

        // Generate new verification token
        const verificationToken = generateVerificationToken();
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        // Save new verification token
        await EmailVerification.create({
            email: user.email,
            token: hashedToken,
            expiresAt: Date.now() + (process.env.VERIFICATION_TOKEN_EXPIRE || 86400) * 1000
        });

        // Send verification email
        await sendVerificationEmail(user, verificationToken);

        res.status(200).json({
            success: true,
            message: 'Verification email resent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Login user with email verification check
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {

        //extracting login credentials
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check for user and including password
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'invalid credentials'
            });
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json({
                success: false,
                message: 'Please verify your email address before logging in',
                requiresVerification: true,
                email: user.email
            });
        }

        // verify password using bcrypt comparison
        const isMatched = await bcrypt.compare(password,user.password);

        if(user && isMatched){
            return  res.status(200).json({
                success: true,
                token: generateToken(user._id),
                user: {
                   id: user._id,
                   name: user.name,
                   email: user.email,
                   role: user.role,
                   profilePicture: user.profilePicture || null,
                   isEmailVerified: user.isEmailVerified
            }
        });
        }

       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Forgot password - Send reset token email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email address'
            });
        }

        // check if user exists
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with that email address'
            });
        }

         // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Please verify your email address first',
                requiresVerification: true,
                email: user.email
            });
        }

        // Delete any existing reset tokens for this user
        await PasswordReset.deleteMany({ email: user.email });

        // Generate cryptographically secure reset token and hash it
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save token to database
        await PasswordReset.create({
            email: user.email,
            token: hashedToken,
            expiresAt: Date.now() + 3600000 // 1 hour
        });

        // Create reset URL for frontend
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        
        // Send password reset email
        const emailHtml = passwordResetEmail(user.name, resetUrl);
        
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            html: emailHtml
        });

        res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a new password'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Hash the token from URL to compare with stored hashed token in db
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        
        // Finding  validity of reset token
        const resetRecord = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false
        });

        if (!resetRecord) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Find user
        const user = await User.findOne({ email: resetRecord.email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update user's password(will be hashed by pre-save middleware)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        user.password = hashedPassword;
        await user.save();

        // Mark token as used to prevent reuse
        resetRecord.used = true;
        await resetRecord.save();

        // Send success confirmation email
        const successHtml = passwordResetSuccessEmail(user.name);
        await sendEmail({
            email: user.email,
            subject: 'Password Changed Successfully',
            html: successHtml
        });

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Change password (when logged in)
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current and new password'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            });
        }

        // Get user with password
        const user = await User.findById(req.user.id).select('+password');
        
        // verify current password
        const isMatch = await user.matchPassword(currentPassword);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password to new one
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {

        // get user using id from protect middleware
        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture || null,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const updateData = {};

        if (name) updateData.name = name;

         // If email is being changed, require re-verification
        if (email && email !== req.user.email) {
            updateData.email = email;
            updateData.isEmailVerified = false;
            
            // Generate new verification token
            const verificationToken = generateVerificationToken();
            const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
            
            // Save verification token
            await EmailVerification.create({
                email: email,
                token: hashedToken,
                expiresAt: Date.now() + (process.env.VERIFICATION_TOKEN_EXPIRE || 86400) * 1000
            });
            
            // Send verification email
            await sendVerificationEmail({ name: req.user.name, email }, verificationToken);
        }
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true, runValidators: true }  // Return updated doc, validate input
        );
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture || null,
                isEmailVerified: user.isEmailVerified
            },
            message: email && email !== req.user.email ? 'Profile updated. Please verify your new email address.' : 'Profile updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

module.exports = {
    register,
    verifyEmail,
    resendVerificationEmail,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    updateProfile,
    logout
};