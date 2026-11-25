const express = require('express');
const router = express.Router();
const { exportSalesCsvStream } = require('../controllers/streamController');

// Stream Sales CSV report directly to response pipe (Module 7)
router.get('/sales-csv', exportSalesCsvStream);

module.exports = router;
