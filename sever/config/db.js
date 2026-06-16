const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if cannot connect
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Exit process with failure so Render restarts it
    process.exit(1);
  }
};

module.exports = connectDB;
