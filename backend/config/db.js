const mongoose = require('mongoose'); 

const connectDB = async () => {
    try {
        // connect to MongoDB using URI from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI
        //     , { 
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        // }
    );

        // log successful connection with host name
        console.log(`MongoDB Connected: ${conn.connection.host}`); 
    } catch (error) {
        console.error(`Error: ${error.message}`); 

        // exit the application with failure code
        process.exit(1); 
    }
};

module.exports = connectDB;