/**
 * Farmer Profile Model (Extended KYC & Farm Details)
 */
const mongoose = require('mongoose');

const farmerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    farmName: {
      type: String,
      required: [true, 'Please provide farm name'],
      trim: true
    },
    farmLocation: {
      village: { type: String, required: true },
      mandal: { type: String, default: '' },
      district: { type: String, required: true },
      state: { type: String, default: 'Andhra Pradesh' },
      pincode: { type: String, required: true },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [80.648, 16.506]
      }
    },
    landSizeAcres: {
      type: Number,
      required: true,
      min: [0.1, 'Land size must be at least 0.1 acres']
    },
    farmingType: {
      type: String,
      enum: ['ORGANIC', 'NATURAL', 'CONVENTIONAL', 'HYDROPONIC'],
      default: 'ORGANIC'
    },
    primaryCrops: {
      type: [String],
      default: ['Tomatoes', 'Paddy', 'Chillies']
    },
    governmentIdType: {
      type: String,
      enum: ['AADHAAR', 'PATTADAR_PASSBOOK', 'KISAN_CREDIT_CARD'],
      default: 'PATTADAR_PASSBOOK'
    },
    governmentIdNumber: {
      type: String,
      required: true
    },
    verificationDocumentUrl: {
      type: String,
      default: ''
    },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: {
      type: Date
    },
    rejectionReason: {
      type: String,
      default: ''
    },
    bankDetails: {
      accountHolderName: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      ifscCode: { type: String, default: '' },
      bankName: { type: String, default: '' },
      upiId: { type: String, default: '' }
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5
    },
    totalSalesCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('FarmerProfile', farmerProfileSchema);
