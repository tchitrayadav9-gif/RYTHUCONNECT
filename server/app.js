/**
 * Express Application Setup (Module 1 & Module 5)
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const routes = require('./routes');
const requestLogger = require('./middleware/loggerMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Enable CORS for client
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
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
    message: 'Welcome to RythuConnect – Smart Farmer-to-Customer Marketplace API',
    documentation: '/api/v1/health',
    status: 'Running'
  });
});

// Mount Main API Router
app.use('/api/v1', routes);

// Error Handling Middlewares (Module 5)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
