// const mongoose = require('mongoose'); 

// const connectDB = async () => {
//     try {
//         // connect to MongoDB using URI from environment variables
//         const conn = await mongoose.connect(process.env.MONGODB_URI
//         //     , { 
//         //     useNewUrlParser: true, 
//         //     useUnifiedTopology: true,
//         // }
//     );

//         // log successful connection with host name
//         console.log(`MongoDB Connected: ${conn.connection.host}`); 
//     } catch (error) {
//         console.error(`Error: ${error.message}`); 

//         // exit the application with failure code
//         process.exit(1); 
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

// Create a cached connection across function invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log('📦 Using cached database connection');
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering - fail fast instead of timing out
      maxPoolSize: 10,       // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if can't connect
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4,             // Use IPv4, skip trying IPv6
    };

    console.log('🔄 Creating new database connection...');
    
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
        return mongoose;
      })
      .catch((error) => {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        cached.promise = null; // Reset promise on error
        throw error;
      });
  }

  // Wait for the connection to be established
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;