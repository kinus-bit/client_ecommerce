const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { uploadProductImages, handleUploadError } = require('../middlewares/uploadMiddleware');
const {
    createProduct,
    createProductWithImages,  // Import the new function
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    updateProductStock,
    getProductsBySubcategory
} = require('../controllers/productController');

// Public routes

//get all products with filtering,sorting and pagination
router.get('/', getAllProducts);

//get products by specific category
router.get('/procategory/:categoryId', getProductsByCategory);

//get products by specific category
router.get('/prosubcategory/:subcategoryId', getProductsBySubcategory);

//get single product by ID (with validation)
router.get('/:id', getProductById);

// Protected routes - Admin only
// NEW: Create product with images in single request (MULTIPART FORM DATA)
router.post(
    '/with-images',
    protect,
    authorize('admin'),
    uploadProductImages,      // Handle multiple image uploads first
    handleUploadError,        // Handle multer errors
    createProductWithImages   // Create product with image URLs
);

//create a new product
router.post('/', protect, authorize('admin'), createProduct);
//update existing product
router.put('/:id', protect, authorize('admin'), updateProduct);

//update only product stock
router.patch('/:id/stock', protect, authorize('admin'), updateProductStock);

//delete product
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;