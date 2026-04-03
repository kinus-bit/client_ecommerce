const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { productValidation, validate } = require('../middleware/validationMiddleware');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    updateProductStock
} = require('../controllers/productController');

// Public routes

//get all products with filtering,sorting and pagination
router.get('/', getAllProducts);

//get products by specific category
router.get('/category/:category', getProductsByCategory);

//get single product by ID (with validation)
router.get('/:id', productValidation.getProduct, validate, getProductById);

// Protected routes - Admin only

//create a new product
router.post('/', protect, authorize('admin'), productValidation.createProduct, validate, createProduct);

//update existing product
router.put('/:id', protect, authorize('admin'), productValidation.updateProduct, validate, updateProduct);

//update only product stock
router.patch('/:id/stock', protect, authorize('admin'), updateProductStock);

//delete product
router.delete('/:id', protect, authorize('admin'), productValidation.deleteProduct, validate, deleteProduct);

module.exports = router;