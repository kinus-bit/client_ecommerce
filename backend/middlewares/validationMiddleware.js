//importing validation tools
const { body, param, query, validationResult } = require('express-validator');

// grouping all user-related validation rules
const userValidation = {
    updateRole: [

        // Validating MongoDB ID in URL parameter
        param('id').isMongoId().withMessage('Invalid user ID'),

        // Validate role in request body
        body('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin')
    ],
    deleteUser: [

        // Simple ID validation for deletion
        param('id').isMongoId().withMessage('Invalid user ID')
    ]
};

// Group all product-related validation rules
const productValidation = {
    createProduct: [
        body('name').notEmpty().withMessage('Product name is required')
            .isLength({ min: 3, max: 100 }).withMessage('Product name must be between 3 and 100 characters'),
        body('description').notEmpty().withMessage('Description is required')
            .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),

        //Accepts decimals, no negative
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),

        //Matches enum from Product schema
        body('category').isIn(['electronics', 'clothing', 'books', 'home', 'beauty', 'sports', 'other'])
            .withMessage('Invalid category'),
        
        //Interger only
        body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
    ],
    updateProduct: [
        param('id').isMongoId().withMessage('Invalid product ID'),

        // optional() makes field not required
        body('name').optional().isLength({ min: 3, max: 100 }).withMessage('Product name must be between 3 and 100 characters'),
        body('description').optional().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('category').optional().isIn(['electronics', 'clothing', 'books', 'home', 'beauty', 'sports', 'other'])
            .withMessage('Invalid category'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
    ],
    getProduct: [
        param('id').isMongoId().withMessage('Invalid product ID')
    ],
    deleteProduct: [
        param('id').isMongoId().withMessage('Invalid product ID')
    ],
    getProducts: [

        // For pagination
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),

        // Items per page
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),

        // Filter by category
        query('category').optional().isIn(['electronics', 'clothing', 'books', 'home', 'beauty', 'sports', 'other'])
            .withMessage('Invalid category'),

        // Price range filter
        query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
        query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),

        // Sorting options for listing
        query('sort').optional().isIn(['price_asc', 'price_desc', 'name_asc', 'name_desc', 'newest', 'oldest'])
            .withMessage('Invalid sort option')
    ]
};

// Middleware to check validation results and return errors if any
const validate = (req, res, next) => {

    //collect all validation errors from the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    //no errors , proceed to the next middleware/ route handler
    next();
};

module.exports = {
    userValidation,
    productValidation,
    validate
};