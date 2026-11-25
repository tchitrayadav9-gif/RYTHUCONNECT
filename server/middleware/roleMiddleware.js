/**
 * Role-Based Access Control (RBAC) Middleware (Module 5)
 */
const ApiResponse = require('../utils/apiResponse');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required before checking authorization roles');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(
        res,
        `Access denied. Role '${req.user.role}' is not authorized to access this resource. Allowed: [${roles.join(', ')}]`
      );
    }

    next();
  };
};

module.exports = {
  authorize
};
