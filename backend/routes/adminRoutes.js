const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getUserStats
} = require('../controllers/adminController');

// Global middleware for all admin routes
router.use(protect);            // logged in
router.use(authorize('admin')); // role is admin

// User management routes

//get all users with pagination
router.get('/users', getAllUsers);

//get user statistics
router.get('/users/stats', getUserStats);

//get single user by ID
router.get('/users/:id', getUserById);

//update user role
router.put('/users/:id/role', updateUserRole);

//Delete user
router.delete('/users/:id', deleteUser);

module.exports = router;