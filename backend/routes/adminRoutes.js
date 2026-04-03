const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { userValidation, validate } = require('../middleware/validationMiddleware');
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
router.put('/users/:id/role', userValidation.updateRole, validate, updateUserRole);

//Delete user
router.delete('/users/:id', userValidation.deleteUser, validate, deleteUser);

module.exports = router;