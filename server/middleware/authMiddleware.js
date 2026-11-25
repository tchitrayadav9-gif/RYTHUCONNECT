/**
 * Authentication Middleware (Module 4 & Module 5)
 */
const { verifyToken } = require('../utils/jwt');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/User');
const { isMongoConnected } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return ApiResponse.unauthorized(res, 'Not authorized, token missing in Authorization header');
  }

  try {
    const decoded = verifyToken(token);

    if (isMongoConnected()) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return ApiResponse.unauthorized(res, 'User belonging to this token no longer exists');
      }
      req.user = user;
    } else {
      // Fallback object from token payload if MongoDB is offline
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Demo User',
        email: decoded.email,
        role: decoded.role,
        status: 'ACTIVE'
      };
    }

    next();
  } catch (err) {
    return ApiResponse.unauthorized(res, 'Not authorized, invalid or expired token');
  }
};

module.exports = {
  protect
};
