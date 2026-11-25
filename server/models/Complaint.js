/**
 * Complaint Model (Quality & Dispute Escalation)
 */
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    category: {
      type: String,
      enum: ['QUALITY_ISSUE', 'DELAYED_DELIVERY', 'INCORRECT_QUANTITY', 'OVERCHARGED', 'OTHER'],
      default: 'QUALITY_ISSUE'
    },
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['OPEN', 'IN_INVESTIGATION', 'RESOLVED', 'DISMISSED'],
      default: 'OPEN'
    },
    resolutionNotes: {
      type: String,
      default: ''
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);
