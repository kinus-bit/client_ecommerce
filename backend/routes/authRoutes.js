const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
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
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Validation rules for registration
const registerValidation = [

    //Validate name field
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    //Validate email field
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),

    //Validate password field
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

//Validation rules for login
const loginValidation = [

    //validate email
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),

    //validate password
    body('password')
        .notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// const updateProfileValidation = [
//     body('name')
//         .optional()
//         .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
//     body('email')
//         .optional()
//         .isEmail().withMessage('Please provide a valid email')
// ];

const resendVerificationValidation = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
];


// Public routes
router.post('/register', registerValidation, register);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationValidation, resendVerificationEmail);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidation, resetPassword);

// Private routes
router.get('/me', protect, getMe);
router.put('/profile',
     protect, 
    //  updateProfileValidation, 
     updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);
router.get('/logout', protect, logout);

module.exports = router;