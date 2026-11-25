/**
 * User Model (Module 4 & Module 8)
 * Roles: FARMER, CUSTOMER, BULK_BUYER, DELIVERY_PARTNER, ADMIN
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Exclude from queries by default for security
    },
    role: {
      type: String,
      enum: ['FARMER', 'CUSTOMER', 'BULK_BUYER', 'DELIVERY_PARTNER', 'ADMIN'],
      default: 'CUSTOMER'
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED'],
      default: 'ACTIVE'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      district: { type: String, default: '' },
      state: { type: String, default: 'Andhra Pradesh' },
      pincode: { type: String, default: '' },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [80.5, 16.5]
      }
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook: Hash password with bcrypt (Module 4)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
