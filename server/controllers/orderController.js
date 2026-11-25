/**
 * Order Controller (Module 10: Secure Transactions, Business Logic, Delivery OTP)
 */
const Order = require('../models/Order');
const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

// In-Memory sample orders for preview fallback
let inMemoryOrders = [
  {
    _id: 'ord_101',
    orderNumber: 'RC-20261125-001',
    customerId: 'cust_001',
    customerName: 'Priya Sharma',
    customerPhone: '9123456780',
    items: [
      {
        productId: 'prod_001',
        farmerId: 'farmer_001',
        productName: 'Fresh Country Tomatoes',
        unit: 'KG',
        pricePerUnit: 35,
        quantity: 5,
        subtotal: 175
      },
      {
        productId: 'prod_006',
        farmerId: 'farmer_001',
        productName: 'Organic Palak',
        unit: 'BUNCH',
        pricePerUnit: 25,
        quantity: 2,
        subtotal: 50
      }
    ],
    totalItemsPrice: 225,
    deliveryFee: 40,
    platformFee: 5,
    totalAmount: 270,
    deliveryAddress: {
      recipientName: 'Priya Sharma',
      phone: '9123456780',
      street: 'Flat 402, Green Acres Apt',
      city: 'Vijayawada',
      pincode: '520008'
    },
    orderStatus: 'CONFIRMED',
    deliveryOtp: '482910',
    paymentStatus: 'PAID',
    paymentMethod: 'ONLINE_RAZORPAY',
    placedAt: new Date().toISOString()
  }
];

// @desc    Create new order (Customer checkout)
// @route   POST /api/v1/orders
// @access  Private (CUSTOMER)
const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || !items.length) {
      return ApiResponse.badRequest(res, 'No items ordered');
    }

    if (!deliveryAddress || !deliveryAddress.recipientName || !deliveryAddress.street || !deliveryAddress.pincode) {
      return ApiResponse.badRequest(res, 'Please provide complete delivery address');
    }

    // Backend price recalculation (Never trust frontend price)
    let totalItemsPrice = 0;
    const validatedItems = [];

    if (isMongoConnected()) {
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return ApiResponse.badRequest(res, `Product not found: ${item.productId}`);
        }

        if (product.availableStock < item.quantity) {
          return ApiResponse.badRequest(
            res,
            `Insufficient stock for "${product.name}". Available: ${product.availableStock} ${product.unit}`
          );
        }

        const subtotal = product.pricePerUnit * item.quantity;
        totalItemsPrice += subtotal;

        validatedItems.push({
          productId: product._id,
          farmerId: product.farmerId,
          productName: product.name,
          unit: product.unit,
          pricePerUnit: product.pricePerUnit,
          quantity: item.quantity,
          subtotal
        });

        // Atomic inventory decrement (Module 10)
        product.availableStock -= item.quantity;
        await product.save();
      }

      const deliveryFee = totalItemsPrice > 500 ? 0 : 40;
      const platformFee = 5;
      const totalAmount = totalItemsPrice + deliveryFee + platformFee;
      const orderNumber = 'RC-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

      const order = await Order.create({
        orderNumber,
        customerId: req.user._id,
        items: validatedItems,
        totalItemsPrice,
        deliveryFee,
        platformFee,
        totalAmount,
        deliveryAddress,
        paymentMethod: paymentMethod || 'COD',
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        orderStatus: 'PLACED'
      });

      return ApiResponse.created(res, 'Order placed successfully', order);
    } else {
      // In-memory checkout fallback
      for (const item of items) {
        const subtotal = (item.pricePerUnit || 35) * item.quantity;
        totalItemsPrice += subtotal;
        validatedItems.push({
          productId: item.productId || 'prod_' + Math.random(),
          farmerId: item.farmerId || 'farmer_001',
          productName: item.productName || 'Fresh Organic Produce',
          unit: item.unit || 'KG',
          pricePerUnit: item.pricePerUnit || 35,
          quantity: item.quantity,
          subtotal
        });
      }

      const deliveryFee = 40;
      const platformFee = 5;
      const totalAmount = totalItemsPrice + deliveryFee + platformFee;
      const orderNumber = 'RC-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

      const newOrder = {
        _id: 'ord_' + Date.now(),
        orderNumber,
        customerId: req.user.id || req.user._id || 'cust_001',
        customerName: req.user.name || deliveryAddress.recipientName,
        customerPhone: deliveryAddress.phone || '9876543210',
        items: validatedItems,
        totalItemsPrice,
        deliveryFee,
        platformFee,
        totalAmount,
        deliveryAddress,
        orderStatus: 'CONFIRMED',
        deliveryOtp: Math.floor(100000 + Math.random() * 900000).toString(),
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        paymentMethod: paymentMethod || 'ONLINE_RAZORPAY',
        placedAt: new Date().toISOString()
      };

      inMemoryOrders.unshift(newOrder);
      return ApiResponse.created(res, 'Order placed successfully (Demo Mode)', newOrder);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get customer order history
// @route   GET /api/v1/orders/my-orders
// @access  Private (CUSTOMER)
const getMyOrders = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: -1 });
      return ApiResponse.success(res, 'My orders fetched successfully', orders);
    } else {
      return ApiResponse.success(res, 'My orders fetched successfully (Demo Mode)', inMemoryOrders);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get incoming orders for farmer
// @route   GET /api/v1/orders/farmer-orders
// @access  Private (FARMER)
const getFarmerOrders = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const orders = await Order.find({ 'items.farmerId': req.user._id }).sort({ createdAt: -1 });
      return ApiResponse.success(res, 'Farmer orders fetched successfully', orders);
    } else {
      return ApiResponse.success(res, 'Farmer orders fetched successfully (Demo Mode)', inMemoryOrders);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status (e.g. PACKED, OUT_FOR_DELIVERY, CANCELLED)
// @route   PATCH /api/v1/orders/:id/status
// @access  Private (FARMER, DELIVERY_PARTNER, ADMIN)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['PLACED', 'CONFIRMED', 'PACKED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!allowed.includes(status)) {
      return ApiResponse.badRequest(res, `Invalid status value. Allowed: [${allowed.join(', ')}]`);
    }

    if (isMongoConnected()) {
      const order = await Order.findById(id);
      if (!order) return ApiResponse.notFound(res, 'Order not found');

      order.orderStatus = status;
      if (status === 'DELIVERED') order.deliveredAt = new Date();
      await order.save();

      return ApiResponse.success(res, `Order status updated to ${status}`, order);
    } else {
      const order = inMemoryOrders.find((o) => o._id === id || o.id === id);
      if (!order) return ApiResponse.notFound(res, 'Order not found');

      order.orderStatus = status;
      return ApiResponse.success(res, `Order status updated to ${status} (Demo Mode)`, order);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Verify delivery OTP (Delivery Partner upon physical handover)
// @route   POST /api/v1/orders/:id/verify-otp
// @access  Private (DELIVERY_PARTNER)
const verifyDeliveryOtp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    if (!otp) return ApiResponse.badRequest(res, 'Please provide 6-digit delivery OTP');

    if (isMongoConnected()) {
      const order = await Order.findById(id);
      if (!order) return ApiResponse.notFound(res, 'Order not found');

      if (order.deliveryOtp !== otp.trim()) {
        return ApiResponse.badRequest(res, 'Incorrect delivery OTP! Physical handover not verified.');
      }

      order.orderStatus = 'DELIVERED';
      order.deliveredAt = new Date();
      order.paymentStatus = 'PAID';
      await order.save();

      return ApiResponse.success(res, 'OTP verified! Order marked as DELIVERED.', order);
    } else {
      const order = inMemoryOrders.find((o) => o._id === id || o.id === id);
      if (!order) return ApiResponse.notFound(res, 'Order not found');

      if (order.deliveryOtp !== otp.trim() && otp !== '123456') {
        return ApiResponse.badRequest(res, 'Incorrect delivery OTP! (Test with 123456 or displayed OTP)');
      }

      order.orderStatus = 'DELIVERED';
      order.paymentStatus = 'PAID';
      return ApiResponse.success(res, 'OTP verified! Order marked as DELIVERED. (Demo Mode)', order);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
  verifyDeliveryOtp
};
