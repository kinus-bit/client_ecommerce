const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {

    //create directory and any missing parent directories if doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configure storage for product images
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        //define upload path: /uploads/products
        const dir = path.join(__dirname, '../uploads/products');

        //create if doesn't exist
        ensureDirectoryExists(dir);

        //pass directory to multer
        cb(null, dir);
    },
    filename: (req, file, cb) => {

        //generate unique filename to prevent collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //preserve original file extension
        const ext = path.extname(file.originalname);

        //format: product-1234567890-1234567890.jpg
        cb(null, `product-${uniqueSuffix}${ext}`);
    }
});

// Configure storage for profile pictures
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        //define upload path: /uploads/profiles
        const dir = path.join(__dirname, '../uploads/profiles');

        //create direstory if doesn't exist
        ensureDirectoryExists(dir);

        //pass to multer
        cb(null, dir);
    },
    filename: (req, file, cb) => {

        //Generate unique filename to prevent collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //preserve original file extension
        const ext = path.extname(file.originalname);

        //format: profile-userid-timestamp-random.jpg
        cb(null, `profile-${req.user.id}-${uniqueSuffix}${ext}`);
    }
});

// File filter to restrict allowed file types
const fileFilter = (req, file, cb) => {

    //Get allowed MIME types from environment variable
    const allowedTypes = process.env.ALLOWED_FILE_TYPES.split(',');

    if (allowedTypes.includes(file.mimetype)) {

        //accept file
        cb(null, true);
    } else {

        //reject file with an error
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

// Configure multer for single product image upload
const uploadProductImage = multer({
    storage: productStorage,
    limits: {

        // 5MB default limit
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
    },
    fileFilter: fileFilter

    //Expect field name 'image' in form data
}).single('image');

// Configure multer for multiple product images upload
const uploadProductImages = multer({
    storage: productStorage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
    },
    fileFilter: fileFilter

    // Expect field name 'images', max 5 files
}).array('images', 5); 

// Configure multer for profile picture upload
const uploadProfilePicture = multer({
    storage: profileStorage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
    },
    fileFilter: fileFilter

    //Expect field name 'profilePicture'
}).single('profilePicture');

// Error handling middleware for multer-specific errors
const handleUploadError = (err, req, res, next) => {

    //check if error is a multer error(file upload specific)
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: `File too large. Maximum size is ${parseInt(process.env.MAX_FILE_SIZE) / 1048576}MB` , // Convert bytes to MB
                error: err.message
            });
        }

        //Handle other multer errors( LIMIT_FILE_COUNT, etc.)
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    //Handle custom errors from fileFilter
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    //No error, proceed to next middleware
    next();
};

module.exports = {
    uploadProductImage,
    uploadProductImages,
    uploadProfilePicture,
    handleUploadError
};