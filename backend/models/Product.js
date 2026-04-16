const mongoose = require('mongoose');

// define the schema structure for product documents
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true, //Removes whitespace from both ends
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative'] //prevents negative prices
    },
    originalPrice: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative'] //prevents negative prices
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['electronics', 'furniture', 'drinks', 'decor', 'cutlery',
             'menfashion', 'womenfashion', 'curtains', 'carpets']
    },
    subCategory: {
        type: String,
        required: [true, 'Please add a subcategory'],
        enum: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Beds',
            'Kitchen tables', 'Study tables','Chairs','Closet', 'Jeans',
            'T-shirts', 'Sweaters', 'Jackets', 'shoes', 'Tops', 'jeans',
            'Trousers', 'skirts', 'jackets', 'bags', 'dress']
    },
    color: [{
        type: String,
        required: [true, 'Please add a subcategory']
    }],
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0 //Default value if not provided
    },
    discount: {
        type: Number,
        min: [0, 'Discount cannot be negative'],
        default: 0
    },
    images: [{
        type: String, // Array of image URLs
        trim:true
    }],
    ratings: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0  //track how many users have rated
    },
    specifications: [{
        type: String,
        required: [true, 'Provide a specification']
    }],
    highlights: [{
        type: String,
        required: [true, 'Provide a highlights']
    }],
    comments: {
        type: String,
        default: ''
    },
    IsNew: {
        type: Boolean,
        default:false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, //References User collection
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware that runs before saving a document
productSchema.pre('save', function(next) {

    //Automatically update the timestamp on any save
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', productSchema);