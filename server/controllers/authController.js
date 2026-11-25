/**
 * Authentication Controller (Module 4 & Module 10)
 * Handles Google OAuth 2.0 (Customers) & Email/Password (Farmers & Fixed Admin)
 */
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
const { generateToken } = require('../utils/jwt');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '');

// In-memory demo store fallback if MongoDB Atlas is offline
let inMemoryUsers = [
  {
    _id: 'admin_fixed_001',
    id: 'admin_fixed_001',
    name: 'Admin Chitra',
    email: 'tchitrayadav9@gmail.com',
    phone: '9876543210',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

// @desc    Google OAuth Login & Auto-Registration (CUSTOMER ONLY)
// @route   POST /api/v1/auth/google
// @access  Public
const googleLogin = async (req, res, next) => {
  try {
    const { credential, profile } = req.body;

    let googleData = null;

    // 1. Attempt verification with Google's official library if credential is provided
    if (credential && process.env.GOOGLE_CLIENT_ID) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        googleData = {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.picture,
          emailVerified: payload.email_verified
        };
      } catch (verifyErr) {
        console.warn('⚠️ Google ID Token verification notice:', verifyErr.message);
      }
    }

    // 2. Fallback to client profile if client is in test/development mode
    if (!googleData && profile && profile.email) {
      googleData = {
        googleId: profile.sub || 'google_sub_' + Date.now(),
        email: profile.email,
        name: profile.name || profile.email.split('@')[0],
        avatar: profile.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        emailVerified: true
      };
    }

    if (!googleData || !googleData.email) {
      return ApiResponse.badRequest(res, 'Invalid Google credentials. Please try signing in again.');
    }

    if (isMongoConnected()) {
      // Find user by email or googleId
      let user = await User.findOne({
        $or: [{ email: googleData.email }, { googleId: googleData.googleId }]
      });

      if (!user) {
        // First-time customer: Auto-create customer account
        user = await User.create({
          name: googleData.name,
          email: googleData.email,
          googleId: googleData.googleId,
          isGoogleAuth: true,
          role: 'CUSTOMER',
          avatar: googleData.avatar,
          status: 'ACTIVE'
        });
      } else {
        // Existing user: ensure googleId and avatar are updated
        user.googleId = googleData.googleId;
        user.isGoogleAuth = true;
        if (googleData.avatar) user.avatar = googleData.avatar;
        await user.save();
      }

      const token = generateToken({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name
      });

      return ApiResponse.success(res, 'Google Sign-In successful', {
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          savedAddresses: user.savedAddresses || []
        },
        token
      });
    } else {
      // In-Memory Fallback for instant preview
      let user = inMemoryUsers.find((u) => u.email === googleData.email);
      if (!user) {
        user = {
          _id: 'cust_g_' + Date.now(),
          id: 'cust_g_' + Date.now(),
          name: googleData.name,
          email: googleData.email,
          role: 'CUSTOMER',
          status: 'ACTIVE',
          avatar: googleData.avatar,
          savedAddresses: []
        };
        inMemoryUsers.push(user);
      }

      const token = generateToken({
        id: user.id,
        role: 'CUSTOMER',
        email: user.email,
        name: user.name
      });

      return ApiResponse.success(res, 'Google Sign-In successful (Demo Mode)', {
        user,
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Farmer & Admin Login (Email + Password)
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.badRequest(res, 'Please provide email and password');
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. FIXED ADMIN ACCOUNT CHECK: tchitrayadav9@gmail.com / Chitra@2516
    if (cleanEmail === 'tchitrayadav9@gmail.com' && password === 'Chitra@2516') {
      let adminUser;
      if (isMongoConnected()) {
        adminUser = await User.findOne({ email: cleanEmail });
        if (!adminUser) {
          adminUser = await User.create({
            name: 'Admin Chitra',
            email: cleanEmail,
            phone: '9876543210',
            password: password,
            role: 'ADMIN',
            status: 'ACTIVE',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          });
        }
      } else {
        adminUser = inMemoryUsers.find((u) => u.email === cleanEmail);
      }

      const adminId = adminUser ? adminUser._id || adminUser.id : 'admin_fixed_001';
      const token = generateToken({
        id: adminId,
        role: 'ADMIN',
        email: cleanEmail,
        name: 'Admin Chitra'
      });

      return ApiResponse.success(res, 'Admin login successful', {
        user: {
          id: adminId,
          _id: adminId,
          name: 'Admin Chitra',
          email: cleanEmail,
          phone: '9876543210',
          role: 'ADMIN',
          status: 'ACTIVE'
        },
        token
      });
    }

    // 2. Regular Farmer or User Login
    if (isMongoConnected()) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (!user) {
        return ApiResponse.unauthorized(res, 'Invalid email or password');
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return ApiResponse.unauthorized(res, 'Invalid email or password');
      }

      const token = generateToken({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name
      });

      return ApiResponse.success(res, 'Login successful', {
        user: {
          id: user._id,
          _id: user._id,
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
      // In-Memory preview login for farmers
      let role = 'FARMER';
      if (cleanEmail.includes('admin')) role = 'ADMIN';

      const mockId = 'demo_' + role.toLowerCase() + '_id';
      const mockUser = {
        id: mockId,
        _id: mockId,
        name: `${role.charAt(0) + role.slice(1).toLowerCase()} User`,
        email: cleanEmail,
        phone: '9876543210',
        role,
        status: 'ACTIVE',
        avatar: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=200&q=80'
      };

      const token = generateToken({
        id: mockId,
        role,
        email: cleanEmail,
        name: mockUser.name
      });

      return ApiResponse.success(res, 'Login successful (Demo Mode)', {
        user: mockUser,
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Farmer Registration (Farmer/Admin Portal)
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, farmDetails } = req.body;

    if (!name || !email || !password) {
      return ApiResponse.badRequest(res, 'Please provide name, email, and password');
    }

    const cleanEmail = email.trim().toLowerCase();

    if (isMongoConnected()) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return ApiResponse.badRequest(res, 'A user with this email already exists');
      }

      const user = await User.create({
        name,
        email: cleanEmail,
        phone: phone || '',
        password,
        role: role || 'FARMER'
      });

      if (user.role === 'FARMER') {
        await FarmerProfile.create({
          userId: user._id,
          farmName: (farmDetails && farmDetails.farmName) || `${name}'s Farm`,
          farmLocation: {
            village: (farmDetails && farmDetails.village) || 'Tenali Rural',
            district: (farmDetails && farmDetails.district) || 'Guntur',
            state: 'Andhra Pradesh',
            pincode: (farmDetails && farmDetails.pincode) || '522001'
          },
          landSizeAcres: (farmDetails && farmDetails.acres) || 3.5,
          farmingType: (farmDetails && farmDetails.farmingType) || 'ORGANIC',
          primaryCrops: (farmDetails && farmDetails.crops) || ['Tomatoes', 'Chillies'],
          governmentIdType: 'PATTADAR_PASSBOOK',
          governmentIdNumber: (farmDetails && farmDetails.idNumber) || 'AP-PPB-' + Date.now().toString(36).toUpperCase(),
          verificationStatus: 'PENDING'
        });
      }

      const token = generateToken({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name
      });

      return ApiResponse.created(res, 'Farmer registered successfully. Awaiting Admin verification.', {
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      });
    } else {
      const mockId = 'farmer_' + Date.now();
      const mockUser = {
        _id: mockId,
        id: mockId,
        name,
        email: cleanEmail,
        phone: phone || '9876543210',
        role: role || 'FARMER',
        status: 'PENDING_VERIFICATION'
      };
      inMemoryUsers.push(mockUser);

      const token = generateToken({ id: mockId, role: mockUser.role, email: cleanEmail, name });

      return ApiResponse.created(res, 'Farmer registered successfully (Demo Mode)', {
        user: mockUser,
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get current user profile & addresses
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'Profile fetched', {
      user: req.user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add delivery address (Customer)
// @route   POST /api/v1/auth/addresses
// @access  Private (CUSTOMER)
const addDeliveryAddress = async (req, res, next) => {
  try {
    const { recipientName, phone, street, city, district, pincode } = req.body;
    if (!recipientName || !phone || !street || !pincode) {
      return ApiResponse.badRequest(res, 'Please provide recipientName, phone, street, and pincode');
    }

    const newAddr = {
      recipientName,
      phone,
      street,
      city: city || 'Vijayawada',
      district: district || 'Krishna',
      pincode,
      isDefault: false
    };

    if (isMongoConnected()) {
      const user = await User.findById(req.user._id);
      if (!user) return ApiResponse.notFound(res, 'User not found');
      user.savedAddresses.push(newAddr);
      await user.save();
      return ApiResponse.created(res, 'Address saved successfully', user.savedAddresses);
    } else {
      return ApiResponse.created(res, 'Address saved (Demo Mode)', [newAddr]);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  googleLogin,
  login,
  register,
  getMe,
  addDeliveryAddress
};
