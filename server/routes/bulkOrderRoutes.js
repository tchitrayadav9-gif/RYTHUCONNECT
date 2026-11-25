const express = require('express');
const router = express.Router();
const { createBulkOrderRequest, getBulkOrders } = require('../controllers/bulkOrderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBulkOrderRequest);
router.get('/', protect, getBulkOrders);

module.exports = router;
