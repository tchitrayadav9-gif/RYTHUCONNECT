/**
 * Payment Model (Financial Records & Escrow Tracking)
 */
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gateway: {
      type: String,
      enum: ['RAZORPAY', 'CASH_ON_DELIVERY', 'UPI', 'MOCK_SANDBOX'],
      default: 'MOCK_SANDBOX'
    },
    gatewayOrderId: {
      type: String,
      default: ''
    },
    gatewayPaymentId: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    },
    status: {
      type: String,
      enum: ['CREATED', 'SUCCESS', 'FAILED'],
      default: 'CREATED'
    },
    escrowStatus: {
      type: String,
      enum: ['HELD', 'DISBURSED_TO_FARMER', 'REFUNDED'],
      default: 'HELD'
    },
    verifiedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
