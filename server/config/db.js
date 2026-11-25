/**
 * MongoDB Atlas Connection Configuration (Module 8: MongoDB Integration)
 */
const mongoose = require('mongoose');
const env = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout so it doesn't hang indefinitely if offline
    });

    isConnected = true;
    console.log(`✅ MongoDB Atlas/Local connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}`);
    console.warn(`ℹ️ RythuConnect will operate with SQLite Academic database and fallback mock persistence until MongoDB connection is provided.`);
  }
};

const isMongoConnected = () => isConnected;

module.exports = {
  connectDB,
  isMongoConnected
};
