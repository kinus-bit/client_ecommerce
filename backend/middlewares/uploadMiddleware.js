const multer = require('multer');

//cloudinary
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure cloudinary for product images
const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        format: async(req, file) => {

            //get file extension without dot
            const ext = file.originalname.split('.').pop();
            return ext === 'jpg' ? 'jpg' : ext === 'png' ? 'png' : 'jpeg';
        },
        public_id: (req, file) => {
            
            //generate unique filename: profile-userId-timestamp
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const originalName = file.originalname.split('.')[0];
            return `product-${originalName}-${uniqueSuffix}`;
        },
        transformation: [
            { width: 500, height: 500, crop: 'limit'},
            { quality: 'auto'}
        ]
    }
});

//configure Cloudinary storage for profile pictures
const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profiles',
        format: async (req, file) => {

            //get file extension without dot
            const ext = file.originalname.split('.').pop();
            return ext === 'jpg' ? 'jpg' : ext === 'png' ? 'png' : 'jpeg';
        },
        public_id: (req, file) => {

            //generate unique filename: profile-userId-timestamp
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `profile-${req.user.id}-${uniqueSuffix}`;
        },
        transformation:[
            { width: 500, height: 500, crop: 'limit'}, //resize to  max 500x
            { quality: 'auto'} //Automatic quality optimization
        ]
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