/**
 * Admin Controller (Platform Governance, KYC Approvals, System Analytics)
 */
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
const Product = require('../models/Product');
const Order = require('../models/Order');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

// In-Memory sample KYC list for demo fallback
let inMemoryKYC = [
  {
    _id: 'kyc_001',
    farmerId: 'farmer_001',
    name: 'Ramesh Naidu',
    phone: '9876543210',
    farmName: 'Naidu Organic Farms',
    village: 'Tenali Rural',
    district: 'Guntur',
    acres: 4.5,
    farmingType: 'ORGANIC',
    crops: ['Tomatoes', 'Chillies', 'Brinjal'],
    idType: 'PATTADAR_PASSBOOK',
    idNumber: 'AP-PPB-892144',
    verificationStatus: 'APPROVED',
    documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    submittedAt: '2026-11-20T10:00:00Z'
  },
  {
    _id: 'kyc_002',
    farmerId: 'farmer_002',
    name: 'Saraswathi Devi',
    phone: '9876543211',
    farmName: 'Saraswathi Natural Orchards',
    village: 'Nuzvid',
    district: 'Krishna',
    acres: 6.0,
    farmingType: 'ORGANIC',
    crops: ['Mangoes', 'Guava', 'A2 Milk'],
    idType: 'KISAN_CREDIT_CARD',
    idNumber: 'AP-KCC-55201',
    verificationStatus: 'APPROVED',
    documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    submittedAt: '2026-11-22T08:30:00Z'
  },
  {
    _id: 'kyc_003',
    farmerId: 'farmer_004',
    name: 'Anji Reddy',
    phone: '9876543214',
    farmName: 'Reddy Millets Estate',
    village: 'Kadapa Rural',
    district: 'YSR Kadapa',
    acres: 8.5,
    farmingType: 'NATURAL',
    crops: ['Ragi', 'Foxtail Millet', 'Groundnut'],
    idType: 'AADHAAR',
    idNumber: 'XXXX-XXXX-9821',
    verificationStatus: 'PENDING',
    documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    submittedAt: '2026-11-24T14:15:00Z'
  }
];

// @desc    Get system-wide metrics and stats
// @route   GET /api/v1/admin/analytics
// @access  Private (ADMIN)
const getAnalytics = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const totalUsers = await User.countDocuments();
      const totalFarmers = await User.countDocuments({ role: 'FARMER' });
      const totalCustomers = await User.countDocuments({ role: 'CUSTOMER' });
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();

      const revenueAgg = await Order.aggregate([
        { $match: { orderStatus: { $ne: 'CANCELLED' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
      ]);

      const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;
      const pendingKYC = await FarmerProfile.countDocuments({ verificationStatus: 'PENDING' });

      return ApiResponse.success(res, 'Analytics fetched successfully', {
        totalUsers,
        totalFarmers,
        totalCustomers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingKYC
      });
    } else {
      return ApiResponse.success(res, 'Analytics fetched successfully (Demo Mode)', {
        totalUsers: 148,
        totalFarmers: 32,
        totalCustomers: 104,
        totalProducts: 24,
        totalOrders: 68,
        totalRevenue: 48950,
        pendingKYC: inMemoryKYC.filter((k) => k.verificationStatus === 'PENDING').length
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get all farmer KYC applications
// @route   GET /api/v1/admin/farmer-verifications
// @access  Private (ADMIN)
const getFarmerVerifications = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const profiles = await FarmerProfile.find().populate('userId', 'name email phone avatar');
      return ApiResponse.success(res, 'Farmer verifications fetched', profiles);
    } else {
      return ApiResponse.success(res, 'Farmer verifications fetched (Demo Mode)', inMemoryKYC);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Approve or Reject Farmer KYC verification
// @route   PATCH /api/v1/admin/farmer-verifications/:id
// @access  Private (ADMIN)
const updateFarmerVerificationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return ApiResponse.badRequest(res, 'Status must be APPROVED or REJECTED');
    }

    if (isMongoConnected()) {
      const profile = await FarmerProfile.findById(id);
      if (!profile) return ApiResponse.notFound(res, 'Farmer profile not found');

      profile.verificationStatus = status;
      profile.verifiedBy = req.user._id;
      profile.verifiedAt = new Date();
      if (status === 'REJECTED') profile.rejectionReason = rejectionReason || 'Documents insufficient';

      await profile.save();
      return ApiResponse.success(res, `Farmer KYC marked as ${status}`, profile);
    } else {
      const item = inMemoryKYC.find((k) => k._id === id || k.id === id);
      if (!item) return ApiResponse.notFound(res, 'Farmer KYC item not found');

      item.verificationStatus = status;
      if (rejectionReason) item.rejectionReason = rejectionReason;

      return ApiResponse.success(res, `Farmer KYC marked as ${status} (Demo Mode)`, item);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnalytics,
  getFarmerVerifications,
  updateFarmerVerificationStatus
};
