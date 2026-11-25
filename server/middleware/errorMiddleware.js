/**
 * Centralized Error-Handling & Not-Found Middleware (Module 1 & Module 5)
 */
const ApiResponse = require('../utils/apiResponse');

// 404 Not Found Middleware
const notFound = (req, res, next) => {
  return ApiResponse.notFound(
    res,
    `Cannot find resource at [${req.method}] ${req.originalUrl}`
  );
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error(`💥 [ERROR] ${req.method} ${req.originalUrl}:`, err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found with identifier of ${err.value}`;
    statusCode = 404;
  }

  // Handle Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: '${field}' must be unique`;
    statusCode = 400;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = 'Validation failed for request data';
    errors = Object.values(err.errors).map((val) => val.message);
    statusCode = 400;
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid authentication token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Authentication token expired, please log in again';
    statusCode = 401;
  }

  return ApiResponse.error(res, message, statusCode, errors);
};

module.exports = {
  notFound,
  errorHandler
};
