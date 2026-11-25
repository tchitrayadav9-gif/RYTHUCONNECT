const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getFarmerVerifications,
  updateFarmerVerificationStatus
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('ADMIN'));

router.get('/analytics', getAnalytics);
router.get('/farmer-verifications', getFarmerVerifications);
router.patch('/farmer-verifications/:id', updateFarmerVerificationStatus);

module.exports = router;
