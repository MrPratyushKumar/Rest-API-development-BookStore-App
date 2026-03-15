// database/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    // Use environment variable instead of hardcoded string
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB is connected successfully");
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;