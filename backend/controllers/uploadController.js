const path = require('path');
const fs = require('fs-extra');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Upload single product image
// @route   POST /api/upload/product-image
// @access  Private/Admin
const uploadProductImage = async (req, res) => {
    try {

        // Check if file was actually uploaded by multer middleware
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        // construct URl for accessing the uploaded file
        const fileUrl = `/uploads/products/${req.file.filename}`;
        
        res.status(200).json({
            success: true,
            data: {
                filename: req.file.filename,
                url: fileUrl,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype //file MIME type
            },
            message: 'File uploaded successfully'
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

// @desc    Upload multiple product images
// @route   POST /api/upload/product-images
// @access  Private/Admin
const uploadProductImages = async (req, res) => {
    try {

        //check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one file'
            });
        }

        // Map each uploaded file to a structured data object
        const files = req.files.map(file => ({
            filename: file.filename,
            url: `/uploads/products/${file.filename}`,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype
        }));
        
        res.status(200).json({
            success: true,
            data: files,
            message: `${files.length} file(s) uploaded successfully`
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

// @desc    Upload profile picture
// @route   POST /api/upload/profile-picture
// @access  Private
const uploadProfilePicture = async (req, res) => {
    try {

        //check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        // Delete old profile picture if exists to save disk space
        const user = await User.findById(req.user.id);
        if (user.profilePicture) {
            const oldFilePath = path.join(__dirname, '..', user.profilePicture);
            if (fs.existsSync(oldFilePath)) {
                await fs.remove(oldFilePath); // Remove old file from disk
            }
        }

        // Update user document with new profile picture URL
        const profilePictureUrl = `/uploads/profiles/${req.file.filename}`;
        await User.findByIdAndUpdate(req.user.id, { profilePicture: profilePictureUrl });

        res.status(200).json({
            success: true,
            data: {
                filename: req.file.filename,
                url: profilePictureUrl,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype
            },
            message: 'Profile picture updated successfully'
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

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:type/:filename
// @access  Private/Admin (for products) or Private (for profile)
const deleteFile = async (req, res) => {
    try {
        const { type, filename } = req.params;
        
        // Validate file type to prevent path traversal attacks
        if (!['products', 'profiles'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type'
            });
        }

        //construct full file path
        const filePath = path.join(__dirname, '../uploads', type, filename);
        
        // check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // If it's a profile picture, remove reference from user
        if (type === 'profiles') {
            await User.findByIdAndUpdate(req.user.id, { profilePicture: null });
        }

        // delete the file from disk
        await fs.remove(filePath);
        
        res.status(200).json({
            success: true,
            message: 'File deleted successfully'
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
    uploadProductImage,
    uploadProductImages,
    uploadProfilePicture,
    deleteFile
};