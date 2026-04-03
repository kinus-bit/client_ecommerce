const jwt = require('jsonwebtoken');
const User = require('../models/User');

//middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    
    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token using JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            //if user not found in DB
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

             // Optional: Check if email is verified (can be bypassed for certain routes)
            // Add this check if you want to enforce email verification for all protected routes
            // if (!req.user.isEmailVerified && req.originalUrl !== '/api/auth/verify-email') {
            //     return res.status(403).json({
            //         success: false,
            //         message: 'Please verify your email address first',
            //         requiresVerification: true
            //     });
            // }

            //Goes to next middleware/ route handler
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    //if no token provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};

// Middleware for role-based access control
// Takes multiple roles as arguments (e.g., authorize('admin', 'user'))
const authorize = (...roles) => { 
    return (req, res, next) => {
        
        //check if user's role is in the allowed roles array
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }

        //User has required role, proceed
        next();
    };
};

// Middleware to require email verification before accessing certain routes
const requireEmailVerification = async (req, res, next) => {
    try {

        //check if user's email is verified
        if (!req.user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email address to access this resource',
                requiresVerification: true
            });
        }

        //Email is verified, proceed
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = { protect, authorize, requireEmailVerification };