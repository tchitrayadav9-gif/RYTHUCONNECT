/**
 * Delivery Model (Logistics & OTP Handover)
 */
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true
    },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pickupLocations: [
      {
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        farmerName: String,
        address: Object,
        isPickedUp: { type: Boolean, default: false },
        pickedUpAt: Date
      }
    ],
    dropLocation: {
      recipientName: String,
      phone: String,
      street: String,
      city: String,
      pincode: String
    },
    status: {
      type: String,
      enum: ['ASSIGNED', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'FAILED'],
      default: 'ASSIGNED'
    },
    otpVerified: {
      type: Boolean,
      default: false
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Delivery', deliverySchema);
