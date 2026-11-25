/**
 * Standardized API Response Utilities (Module 1 & Module 3)
 */

class ApiResponse {
  static success(res, message = 'Success', data = null, statusCode = 200, meta = null) {
    const response = {
      success: true,
      statusCode,
      message,
      data
    };

    if (meta) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  static created(res, message = 'Resource created successfully', data = null) {
    return ApiResponse.success(res, message, data, 201);
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
    const response = {
      success: false,
      statusCode,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static badRequest(res, message = 'Bad Request', errors = null) {
    return ApiResponse.error(res, message, 400, errors);
  }

  static unauthorized(res, message = 'Unauthorized access') {
    return ApiResponse.error(res, message, 401);
  }

  static forbidden(res, message = 'Forbidden: insufficient permissions') {
    return ApiResponse.error(res, message, 403);
  }

  static notFound(res, message = 'Resource not found') {
    return ApiResponse.error(res, message, 404);
  }
}

module.exports = ApiResponse;
