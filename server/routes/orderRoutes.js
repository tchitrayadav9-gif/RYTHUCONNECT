const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
  verifyDeliveryOtp
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('CUSTOMER'), createOrder);
router.get('/my-orders', protect, authorize('CUSTOMER'), getMyOrders);
router.get('/farmer-orders', protect, authorize('FARMER'), getFarmerOrders);
router.patch('/:id/status', protect, authorize('FARMER', 'DELIVERY_PARTNER', 'ADMIN'), updateOrderStatus);
router.post('/:id/verify-otp', protect, authorize('DELIVERY_PARTNER', 'ADMIN'), verifyDeliveryOtp);

module.exports = router;
