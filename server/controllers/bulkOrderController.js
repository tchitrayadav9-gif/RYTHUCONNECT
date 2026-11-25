/**
 * Bulk Order Controller (B2B Procurement for Restaurants, Supermarkets & Hotels)
 */
const BulkOrder = require('../models/BulkOrder');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

let inMemoryBulkOrders = [
  {
    _id: 'bulk_001',
    buyerId: 'bulk_user_01',
    businessName: 'Hotel Amaravathi Grand (Vijayawada)',
    productName: 'Country Tomatoes',
    category: 'Vegetables',
    requestedQuantityKg: 100,
    targetPricePerKg: 28,
    offeredPricePerKg: 30,
    status: 'QUOTED',
    deliveryCadence: 'WEEKLY',
    notes: 'Require freshly picked firm tomatoes every Monday 6 AM.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'bulk_002',
    buyerId: 'bulk_user_01',
    businessName: 'Hotel Amaravathi Grand (Vijayawada)',
    productName: 'Guntur Red Chillies (Stemless)',
    category: 'Spices',
    requestedQuantityKg: 50,
    targetPricePerKg: 160,
    offeredPricePerKg: 170,
    status: 'ACCEPTED',
    deliveryCadence: 'MONTHLY',
    notes: 'Top grade export quality dried chillies.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

const createBulkOrderRequest = async (req, res, next) => {
  try {
    const { businessName, productName, category, requestedQuantityKg, targetPricePerKg, deliveryCadence, notes } = req.body;

    if (!businessName || !productName || !requestedQuantityKg || !targetPricePerKg) {
      return ApiResponse.badRequest(res, 'Please provide businessName, productName, quantity (>20kg) and target price');
    }

    if (isMongoConnected()) {
      const bulkOrder = await BulkOrder.create({
        buyerId: req.user._id,
        businessName,
        productName,
        category: category || 'Vegetables',
        requestedQuantityKg: Number(requestedQuantityKg),
        targetPricePerKg: Number(targetPricePerKg),
        deliveryCadence: deliveryCadence || 'ONE_TIME',
        notes: notes || ''
      });
      return ApiResponse.created(res, 'Bulk procurement quotation submitted', bulkOrder);
    } else {
      const newOrder = {
        _id: 'bulk_' + Date.now(),
        buyerId: req.user.id || req.user._id || 'bulk_user_01',
        businessName,
        productName,
        category: category || 'Vegetables',
        requestedQuantityKg: Number(requestedQuantityKg),
        targetPricePerKg: Number(targetPricePerKg),
        offeredPricePerKg: 0,
        status: 'REQUESTED',
        deliveryCadence: deliveryCadence || 'ONE_TIME',
        notes: notes || '',
        createdAt: new Date().toISOString()
      };
      inMemoryBulkOrders.unshift(newOrder);
      return ApiResponse.created(res, 'Bulk procurement quotation submitted (Demo Mode)', newOrder);
    }
  } catch (err) {
    next(err);
  }
};

const getBulkOrders = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const orders = await BulkOrder.find().sort({ createdAt: -1 });
      return ApiResponse.success(res, 'Bulk orders fetched successfully', orders);
    } else {
      return ApiResponse.success(res, 'Bulk orders fetched successfully (Demo Mode)', inMemoryBulkOrders);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBulkOrderRequest,
  getBulkOrders
};
