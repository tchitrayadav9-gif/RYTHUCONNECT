/**
 * BulkOrder Model (B2B Procurement for Restaurants & Retailers)
 */
const mongoose = require('mongoose');

const bulkOrderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    businessName: {
      type: String,
      required: true
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    productName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'Vegetables'
    },
    requestedQuantityKg: {
      type: Number,
      required: true,
      min: [20, 'Bulk order must be at least 20 KG']
    },
    targetPricePerKg: {
      type: Number,
      required: true
    },
    offeredPricePerKg: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['REQUESTED', 'QUOTED', 'ACCEPTED', 'REJECTED', 'FULFILLED'],
      default: 'REQUESTED'
    },
    deliveryCadence: {
      type: String,
      enum: ['ONE_TIME', 'WEEKLY', 'MONTHLY'],
      default: 'ONE_TIME'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BulkOrder', bulkOrderSchema);
