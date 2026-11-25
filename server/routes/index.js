const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const categoryRoutes = require('./categoryRoutes');
const adminRoutes = require('./adminRoutes');
const bulkOrderRoutes = require('./bulkOrderRoutes');
const uploadRoutes = require('./uploadRoutes');
const streamRoutes = require('./streamRoutes');
const academicSqliteRoutes = require('./academicSqliteRoutes');

// API Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'RYTHU CONNECT API',
    tagline: 'From Farmers to Your Homes – Fresh, Fair and Direct',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Modular Routes Mounting
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/admin', adminRoutes);
router.use('/bulk-orders', bulkOrderRoutes);
router.use('/upload', uploadRoutes);
router.use('/streams', streamRoutes);
router.use('/academic/sqlite', academicSqliteRoutes);

module.exports = router;
