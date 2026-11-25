/**
 * Server Bootstrap Entrypoint (Module 1)
 */
const app = require('./app');
const env = require('./config/env');
const { connectDB } = require('./config/db');

// Initialize Academic SQLite Module (Module 2)
require('./sqlite/database');

const PORT = env.PORT || 5000;

// Start HTTP Server immediately
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 RYTHU CONNECT SERVER RUNNING ON PORT: ${PORT}`);
  console.log(`📡 Base API Endpoint: http://localhost:${PORT}/api/v1`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`📦 SQLite Academic Lab: http://localhost:${PORT}/api/v1/academic/sqlite/schema`);
  console.log(`🌊 CSV Stream Export: http://localhost:${PORT}/api/v1/streams/sales-csv`);
  console.log(`=======================================================`);

  // Connect MongoDB Atlas asynchronously
  connectDB();
});

// Handle unhandled promise rejections safely
process.on('unhandledRejection', (err) => {
  console.error(`💥 Unhandled Rejection: ${err.message}`);
});
