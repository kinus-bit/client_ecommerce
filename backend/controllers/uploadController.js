const Product = require('../models/Product');
const User = require('../models/User');

//Cloudinary
const cloudinary = require('../config/cloudinary');

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

        // Cloudinary automatically stores the file and provides the URl
        const fileUrl = req.file.path; //Cloudinary Url
        
        res.status(200).json({
            success: true,
            data: {
                filename: req.file.filename,
                url: fileUrl,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype //file MIME type
            },
            message: 'File uploaded successfully to Cloudinary'
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
            public_id: file.filename,
            url: file.path, // Cloudinary URL
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

        
        const user = await User.findById(req.user.id);

        // Delete old profile picture from Cloudinary if exists
        if (user.profilePicture) {
            // Extract public_id from Cloudinary URL
            // Format: https://res.cloudinary.com/cloud_name/image/upload/v123456/profiles/filename
            const oldPublicId = user.profilePicture.split('/').slice(-2).join('/').split('.')[0];
            if(oldPublicId){
                await cloudinary.uploader.destroy(oldPublicId);
            }

        }

        // Update user document with cloudinary URL
        const profilePictureUrl = req.file.path; //Cloudinary returns the URL in 'path'
        await User.findByIdAndUpdate(req.user.id, { profilePicture: profilePictureUrl });

        res.status(200).json({
            success: true,
            data: {
                filename: req.file.filename,
                url: profilePictureUrl,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                cloudinaryUrl: profilePictureUrl // Full Cloudinary URL
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



        //Handle profile picture deletion from Cloudinary
        if (type === 'profiles') {

            //get user to find the Cloudinary public_id
            const user = await User.findById(req.user.id);

            if(user.profilePicture){
                //Extract public_id from Cloudinary URl
                const publicId = user.profilePicture.split('/').slice(-2).join('/').split('.')[0];
                if (publicId){

                    //delete from Cloudinary
                    await cloudinary.uploader.destroy(publicId);
                }
            }

            // Remove reference from user
            await User.findByIdAndUpdate(req.user.id, { profilePicture: null });
        }

        //Handle product image deletion
        if(type === 'products'){

            //Construct the full public_id(includes folder)
            const publicId = `products/${filename.split('.')[0]}`;
            await cloudinary.uploader.destroy(publicId);
        }
        
        res.status(200).json({
            success: true,
            message: 'File deleted successfully from Cloudinary'
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