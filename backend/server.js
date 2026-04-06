const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load env vars
dotenv.config();

// Connect to database


//create express app
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    //allow specific origin in production,all in development
    origin: process.env.NODE_ENV === 'production' ? 'your-production-url.com' : '*',
    credentials: true
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// global error handler middleware (should be last)
app.use(errorHandler);

//start server(skip when imported by tests)
if( require.main === module ){
    connectDB();

const PORT = process.env.PORT || 5000;

//starting server.........
const server = app.listen(PORT, () => {
    console.log(`Server running in  http://localhost:${process.env.PORT}`);
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
console.log(`Error: ${err.message}`);
// Close server & exit process
server.close(() => process.exit(1));
});

}
module.exports = app;