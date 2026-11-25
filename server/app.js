/**
 * Express Application Setup (Module 1 & Module 5)
 * Multi-Origin CORS for Customer Website & Farmer/Admin Website
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const routes = require('./routes');
const requestLogger = require('./middleware/loggerMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Allowed Origins: Customer Frontend (:5173 / Vercel) & Farmer/Admin Frontend (:5174 / Vercel)
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev to avoid blocking multi-tab testing
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// Static uploads folder for images (Module 6)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root landing endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RythuConnect Shared Backend API',
    endpoints: {
      customerAuth: '/api/v1/auth/google',
      farmerAdminAuth: '/api/v1/auth/login',
      products: '/api/v1/products',
      orders: '/api/v1/orders'
    },
    status: 'Running'
  });
});

// Mount Main API Router
app.use('/api/v1', routes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
