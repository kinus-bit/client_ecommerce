const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {

        // Pagination setup - get page and limit from query params or use defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate how many documents to skip
        const startIndex = (page - 1) * limit;

        // Get total user count for pagination metadata
        const total = await User.countDocuments();

        // Fetch users with pagination, excluding passwords, newest first
        const users = await User.find()
            .select('-password')
            .limit(limit)
            .skip(startIndex)
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit) // Calculate total pages
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

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {

        // Find user by ID, exclude password
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
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

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        
        //Prevent admin from changing their own role
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change your own role'
            });
        }

        // Find the user to update
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update role and save
        user.role = role;
        await user.save();

        // Return updated user info (excluding sensitive data)
        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        // Prevent admin from deleting their own account.
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        // Find user to delete
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete the user document
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
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

// @desc    Get user statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
    try {

        // Count total users
        const totalUsers = await User.countDocuments();

         // Count users by role
        const adminCount = await User.countDocuments({ role: 'admin' });
        const userCount = await User.countDocuments({ role: 'user' });
        
        // Get 5 most recent users (excluding passwords)
        const recentUsers = await User.find()
            .select('-password')
            .sort('-createdAt')
            .limit(5);
        
        // Recent notifications
        const recentNotifications = await Notification.find()
            .populate('recipient', 'name email')
            .sort('-createdAt')
            .limit(20);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                adminCount,
                userCount,
                recentUsers,
                recentNotifications
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

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getUserStats
};