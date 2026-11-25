/**
 * JWT Utility Functions (Module 4: Authentication)
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (payload, expiresIn = env.JWT_EXPIRE) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};
