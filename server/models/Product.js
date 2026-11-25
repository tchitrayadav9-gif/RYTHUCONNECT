/**
 * Product Model (Direct Farm Produce Catalog - Module 8, 9, 10)
 */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Please provide produce name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide produce description']
    },
    pricePerUnit: {
      type: Number,
      required: [true, 'Please provide price per unit'],
      min: [1, 'Price must be at least 1 INR']
    },
    unit: {
      type: String,
      enum: ['KG', 'QUINTAL', 'BUNCH', 'LITRE', 'PIECE', 'DOZEN'],
      default: 'KG'
    },
    availableStock: {
      type: Number,
      required: [true, 'Please provide available stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: 1
    },
    harvestDate: {
      type: Date,
      required: [true, 'Please specify harvest date'],
      default: Date.now
    },
    shelfLifeDays: {
      type: Number,
      default: 7
    },
    farmingPractice: {
      type: String,
      enum: ['ORGANIC', 'NATURAL', 'CONVENTIONAL'],
      default: 'ORGANIC'
    },
    images: {
      type: [String],
      default: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
      ]
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    traceability: {
      farmDistrict: { type: String, default: 'Krishna' },
      harvestBatchNumber: { type: String, default: () => 'BATCH-' + Date.now().toString(36).toUpperCase() },
      soilType: { type: String, default: 'Black Alluvial Soil' },
      certifiedOrganic: { type: Boolean, default: true }
    },
    averageRating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Compound text index for fast search (Module 9)
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ pricePerUnit: 1, availableStock: 1, isAvailable: 1 });

module.exports = mongoose.model('Product', productSchema);
