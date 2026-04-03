//custom middleware to handle errors
const errorHandler = (err, req, res, next) => {

    //copy error object
    let error = { ...err };

    //ensure message is included
    error.message = err.message;

    //print full error for debugging
    console.log(err);

    // Mongoose bad ObjectId(invalid ID format)
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, statusCode: 404 }; //not foound
    }

    // Mongoose duplicate key error eg email
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 400 }; //bad request
    }

    // Mongoose validation error (schema validation fails)
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors) // get all error messages
            .map(val => val.message)              // extract each message
            .join(', ');                          // combine into one string
        error = { message, statusCode: 400 }; //bad request
    }

    //send response with status code and error message
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
};

module.exports = errorHandler;