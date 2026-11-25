require('dotenv').config();

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'rythuconnect_fallback_jwt_secret_key_2026',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rythuconnect',
  SQLITE_DB_PATH: process.env.SQLITE_DB_PATH || './sqlite/rythu_academic.db',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ''
};

module.exports = env;
