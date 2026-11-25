/**
 * Authentication Controller (Module 4 & Module 10)
 */
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
const { generateToken } = require('../utils/jwt');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

// In-memory demo store fallback for test mode if MongoDB Atlas credentials are not yet entered
const inMemoryUsers = [];

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, farmDetails } = req.body;

    if (!name || !email || !phone || !password) {
      return ApiResponse.badRequest(res, 'Please provide name, email, phone, and password');
    }

    if (isMongoConnected()) {
      // Check if user exists
      const userExists = await User.findOne({ $or: [{ email }, { phone }] });
      if (userExists) {
        return ApiResponse.badRequest(res, 'A user with this email or phone number already exists');
      }

      // Create user
      const user = await User.create({
        name,
        email,
        phone,
        password,
        role: role || 'CUSTOMER'
      });

      // If registered as FARMER, create initial FarmerProfile
      if (user.role === 'FARMER') {
        await FarmerProfile.create({
          userId: user._id,
          farmName: (farmDetails && farmDetails.farmName) || `${name}'s Farm`,
          farmLocation: {
            village: (farmDetails && farmDetails.village) || 'Guntur Rural',
            district: (farmDetails && farmDetails.district) || 'Guntur',
            state: 'Andhra Pradesh',
            pincode: (farmDetails && farmDetails.pincode) || '522001'
          },
          landSizeAcres: (farmDetails && farmDetails.acres) || 3.5,
          farmingType: (farmDetails && farmDetails.farmingType) || 'ORGANIC',
          primaryCrops: (farmDetails && farmDetails.crops) || ['Tomatoes', 'Chillies'],
          governmentIdType: 'PATTADAR_PASSBOOK',
          governmentIdNumber: (farmDetails && farmDetails.idNumber) || 'AP-PPB-' + Date.now().toString(36).toUpperCase()
        });
      }

      const token = generateToken({ id: user._id, role: user.role, email: user.email, name: user.name });

      return ApiResponse.created(res, 'User registered successfully', {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar
        },
        token
      });
    } else {
      // Fallback demo registration
      const existing = inMemoryUsers.find((u) => u.email === email || u.phone === phone);
      if (existing) {
        return ApiResponse.badRequest(res, 'User already exists in demo session');
      }

      const mockId = 'usr_' + Date.now();
      const mockUser = {
        _id: mockId,
        id: mockId,
        name,
        email,
        phone,
        role: role || 'CUSTOMER',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      inMemoryUsers.push(mockUser);

      const token = generateToken({ id: mockId, role: mockUser.role, email, name });

      return ApiResponse.created(res, 'User registered successfully (Demo Mode)', {
        user: mockUser,
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.badRequest(res, 'Please provide email and password');
    }

    if (isMongoConnected()) {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return ApiResponse.unauthorized(res, 'Invalid credentials');
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return ApiResponse.unauthorized(res, 'Invalid credentials');
      }

      const token = generateToken({ id: user._id, role: user.role, email: user.email, name: user.name });

      return ApiResponse.success(res, 'Login successful', {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          avatar: user.avatar
        },
        token
      });
    } else {
      // Fallback demo login: allows login with default roles for preview testing
      let role = 'CUSTOMER';
      if (email.includes('farmer')) role = 'FARMER';
      else if (email.includes('admin')) role = 'ADMIN';
      else if (email.includes('bulk')) role = 'BULK_BUYER';
      else if (email.includes('delivery')) role = 'DELIVERY_PARTNER';

      const mockId = 'demo_' + role.toLowerCase() + '_id';
      const mockUser = {
        id: mockId,
        _id: mockId,
        name: `${role.charAt(0) + role.slice(1).toLowerCase()} User`,
        email,
        phone: '9876543210',
        role,
        status: 'ACTIVE',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      const token = generateToken({ id: mockId, role, email, name: mockUser.name });

      return ApiResponse.success(res, 'Login successful (Demo Mode)', {
        user: mockUser,
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get currently authenticated user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'User profile fetched successfully', {
      user: req.user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe
};
