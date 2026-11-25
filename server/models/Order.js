/**
 * Order Model (Direct Farm-to-Consumer Orders - Module 8, 10)
 */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: 'KG'
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  subtotal: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    items: [orderItemSchema],
    totalItemsPrice: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 40
    },
    platformFee: {
      type: Number,
      default: 5
    },
    totalAmount: {
      type: Number,
      required: true
    },
    deliveryAddress: {
      recipientName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, default: '' },
      pincode: { type: String, required: true }
    },
    orderStatus: {
      type: String,
      enum: ['PLACED', 'CONFIRMED', 'PACKED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
      index: true
    },
    deliveryOtp: {
      type: String,
      default: () => Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING'
    },
    paymentMethod: {
      type: String,
      enum: ['ONLINE_RAZORPAY', 'COD', 'UPI'],
      default: 'COD'
    },
    placedAt: {
      type: Date,
      default: Date.now
    },
    deliveredAt: {
      type: Date
    },
    cancellationReason: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
