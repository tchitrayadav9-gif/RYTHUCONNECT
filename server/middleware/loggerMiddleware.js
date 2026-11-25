/**
 * Request Logger Middleware (Module 1 & Module 5)
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const color = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m'; // Red for error, Green for success
    const reset = '\x1b[0m';

    console.log(
      `[${new Date().toLocaleTimeString()}] ${color}${method}${reset} ${originalUrl} ${color}${statusCode}${reset} - ${duration}ms (IP: ${ip})`
    );
  });

  next();
};

module.exports = requestLogger;
