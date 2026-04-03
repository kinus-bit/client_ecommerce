const Product = require('../models/Product');

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {

        //Merge request body with authenticated user's ID as the creator
        const productData = {
            ...req.body,            // Spread all fields from request body
            createdBy: req.user.id  // Add the admin's ID who created this product
        };

        //save to db
        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            data: product
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

// @desc    Get all products
// @route   GET /api/products
// @access  Public (anyone can view products)
const getAllProducts = async (req, res) => {
    try {

        //Pagination setup
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        
        // Build filter object dynamically based on query parameters
        let filter = {};
        
        //Filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }
        
        //Filter by price range(Both min and max can be used)
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }
        
        //Text search in name or description(case-insensitive)
        if (req.query.search) {
            filter.$or = [
                { name: { $regex: req.query.search, $options: 'i' } }, //'i' for case-insensitive
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        
        // Build sort object basec on sort parameter
        let sort = {};
        if (req.query.sort) {
            switch(req.query.sort) {
                case 'price_asc':
                    sort.price = 1;  //Ascending order
                    break;
                case 'price_desc':
                    sort.price = -1; // Descending order
                    break;
                case 'name_asc':
                    sort.name = 1;
                    break;
                case 'name_desc':
                    sort.name = -1;
                    break;
                case 'newest':
                    sort.createdAt = -1; // Most recent first
                    break;
                case 'oldest':
                    sort.createdAt = 1; // oldest first
                    break;
                default:
                    sort.createdAt = -1;
            }
        } else {
            sort.createdAt = -1; // Default sort by newest
        }
        
        // Get total count for pagination metadata
        const total = await Product.countDocuments(filter);

        // Fetch products with all filters, sorting, and pagination
        const products = await Product.find(filter)
            .populate('createdBy', 'name email')  // Join with User model to get creator details
            .limit(limit)
            .skip(startIndex)
            .sort(sort);
        
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                hasNext: startIndex + limit < total, // More pages available
                hasPrev: startIndex > 0              // Previous pages exist
            },

            // Echo back applied filters for client reference
            filters: {
                category: req.query.category || null,
                minPrice: req.query.minPrice || null,
                maxPrice: req.query.maxPrice || null,
                search: req.query.search || null
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'name email'); // include creator info
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
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

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Update product with new data, return updated version
        product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: product,
            message: 'Product updated successfully'
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

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        //Remove from database
        await product.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
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

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category })
            .limit(20)             // Limit to 20 products for performance
            .sort('-createdAt');   // Newest first
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
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

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
const updateProductStock = async (req, res) => {
    try {
        const { stock } = req.body;
        
        // validate that stock was provided
        if (stock === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Stock quantity is required'
            });
        }
        
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        //Update only the stock field
        product.stock = stock;
        await product.save();  // Triggers the pre('save') middleware
        
        res.status(200).json({
            success: true,
            data: product,
            message: 'Stock updated successfully'
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
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    updateProductStock
};