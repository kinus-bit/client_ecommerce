const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    uploadProductImage,
    uploadProductImages,
    uploadProfilePicture,
    deleteFile
} = require('../controllers/uploadController');
const {
    uploadProductImage: uploadSingleProductImage,
    uploadProductImages: uploadMultipleProductImages,
    uploadProfilePicture: uploadUserProfilePicture,
    handleUploadError
} = require('../middlewares/uploadMiddleware');

// upload single product image (Admin only)
router.post(
    '/product-image',
    protect,
    authorize('admin'),
    uploadSingleProductImage,
    handleUploadError,
    uploadProductImage
);

//  upload Multiple product images (Admin only)
router.post(
    '/product-images',
    protect,
    authorize('admin'),
    uploadMultipleProductImages,
    handleUploadError,
    uploadProductImages
);

//  upload user Profile picture(Authenticated users)
router.post(
    '/profile-picture',
    protect,
    uploadUserProfilePicture,
    handleUploadError,
    uploadProfilePicture
);

// Delete uploaded file
// :type can be 'products' or 'profiles'
// :filename is the name of the file to delete
router.delete('/:type/:filename', protect, deleteFile);

module.exports = router;