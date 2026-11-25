const express = require('express');
const router = express.Router();
const {
  googleLogin,
  login,
  register,
  getMe,
  addDeliveryAddress
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Customer Google Authentication Only
router.post('/google', googleLogin);

// Farmer & Admin Authentication
router.post('/login', login);
router.post('/register', register);

// Profile & Address endpoints
router.get('/me', protect, getMe);
router.post('/addresses', protect, addDeliveryAddress);

module.exports = router;
