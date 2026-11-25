/**
 * Product Controller (Module 9: MongoDB CRUD, Search, Filter, Sort, Pagination)
 */
const Product = require('../models/Product');
const FarmerProfile = require('../models/FarmerProfile');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

// Rich Agricultural Produce Data for Instant Preview / Fallback
let inMemoryProducts = [
  {
    _id: 'prod_001',
    name: 'Fresh Country Tomatoes (నాటు టమాటాలు)',
    description: 'Directly harvested ripe organic country tomatoes with high acidity and rich flavor. Grown with cow-dung natural manure.',
    pricePerUnit: 35,
    unit: 'KG',
    availableStock: 250,
    minimumOrderQuantity: 1,
    harvestDate: new Date().toISOString(),
    farmingPractice: 'ORGANIC',
    category: 'Vegetables',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: true,
    averageRating: 4.8,
    numReviews: 34,
    farmer: {
      id: 'farmer_001',
      name: 'Ramesh Naidu',
      district: 'Guntur',
      village: 'Tenali Rural',
      verified: true
    },
    traceability: {
      farmDistrict: 'Guntur',
      harvestBatchNumber: 'BATCH-GNT-884',
      soilType: 'Red Loamy Soil',
      certifiedOrganic: true
    }
  },
  {
    _id: 'prod_002',
    name: 'Guntur Teja Red Chillies',
    description: 'Sun-dried high capsaicin red chillies from the historic spice capital of Andhra Pradesh.',
    pricePerUnit: 180,
    unit: 'KG',
    availableStock: 120,
    minimumOrderQuantity: 1,
    harvestDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    farmingPractice: 'NATURAL',
    category: 'Spices',
    images: ['https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: true,
    averageRating: 4.9,
    numReviews: 52,
    farmer: {
      id: 'farmer_001',
      name: 'Ramesh Naidu',
      district: 'Guntur',
      village: 'Tenali Rural',
      verified: true
    },
    traceability: {
      farmDistrict: 'Guntur',
      harvestBatchNumber: 'BATCH-GNT-901',
      soilType: 'Black Cotton Soil',
      certifiedOrganic: true
    }
  },
  {
    _id: 'prod_003',
    name: 'Banganapalli Sweet Mangoes',
    description: 'GI Tagged naturally tree-ripened Banganapalli mangoes. Free from calcium carbide ripening agents.',
    pricePerUnit: 120,
    unit: 'KG',
    availableStock: 400,
    minimumOrderQuantity: 2,
    harvestDate: new Date().toISOString(),
    farmingPractice: 'ORGANIC',
    category: 'Fruits',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: true,
    averageRating: 5.0,
    numReviews: 89,
    farmer: {
      id: 'farmer_002',
      name: 'Saraswathi Devi',
      district: 'Krishna',
      village: 'Nuzvid',
      verified: true
    },
    traceability: {
      farmDistrict: 'Krishna',
      harvestBatchNumber: 'BATCH-NZV-102',
      soilType: 'Alluvial River Basin',
      certifiedOrganic: true
    }
  },
  {
    _id: 'prod_004',
    name: 'Sona Masoori Unpolished Rice',
    description: 'Aromatic low-glycemic aged unpolished rice harvested from the Krishna River delta.',
    pricePerUnit: 65,
    unit: 'KG',
    availableStock: 1500,
    minimumOrderQuantity: 5,
    harvestDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    farmingPractice: 'NATURAL',
    category: 'Grains',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: false,
    averageRating: 4.7,
    numReviews: 28,
    farmer: {
      id: 'farmer_003',
      name: 'Venkatesh Rao',
      district: 'West Godavari',
      village: 'Bhimavaram',
      verified: true
    },
    traceability: {
      farmDistrict: 'West Godavari',
      harvestBatchNumber: 'BATCH-WGD-441',
      soilType: 'Deep River Delta Alluvium',
      certifiedOrganic: false
    }
  },
  {
    _id: 'prod_005',
    name: 'Pure Desi Gir Cow A2 Milk',
    description: 'Fresh morning churned raw A2 milk from free-range pasture grazing Gir cows. Delivered cold-chain.',
    pricePerUnit: 80,
    unit: 'LITRE',
    availableStock: 60,
    minimumOrderQuantity: 1,
    harvestDate: new Date().toISOString(),
    farmingPractice: 'ORGANIC',
    category: 'Dairy',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: true,
    averageRating: 4.9,
    numReviews: 44,
    farmer: {
      id: 'farmer_002',
      name: 'Saraswathi Devi',
      district: 'Krishna',
      village: 'Nuzvid',
      verified: true
    },
    traceability: {
      farmDistrict: 'Krishna',
      harvestBatchNumber: 'BATCH-MILK-009',
      soilType: 'Pasture Grassland',
      certifiedOrganic: true
    }
  },
  {
    _id: 'prod_006',
    name: 'Organic Palak (Spinach - పాలకూర)',
    description: 'Crisp green farm-fresh pesticide-free spinach cut at sunrise.',
    pricePerUnit: 25,
    unit: 'BUNCH',
    availableStock: 80,
    minimumOrderQuantity: 1,
    harvestDate: new Date().toISOString(),
    farmingPractice: 'ORGANIC',
    category: 'Vegetables',
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80'],
    isAvailable: true,
    approvalStatus: 'APPROVED',
    isFeatured: false,
    averageRating: 4.6,
    numReviews: 19,
    farmer: {
      id: 'farmer_001',
      name: 'Ramesh Naidu',
      district: 'Guntur',
      village: 'Tenali Rural',
      verified: true
    },
    traceability: {
      farmDistrict: 'Guntur',
      harvestBatchNumber: 'BATCH-PLK-311',
      soilType: 'Red Loamy Soil',
      certifiedOrganic: true
    }
  }
];

// @desc    Get products (Filtered by isAvailable & approvalStatus for customers)
// @route   GET /api/v1/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort, farmerId, page = 1, limit = 12 } = req.query;

    if (isMongoConnected()) {
      const query = { isAvailable: true };

      // If farmer requests own products, show all of them regardless of approval
      if (farmerId) {
        query.farmerId = farmerId;
      } else {
        query.approvalStatus = 'APPROVED';
      }

      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      if (category && category !== 'All') {
        query.category = category;
      }

      if (minPrice || maxPrice) {
        query.pricePerUnit = {};
        if (minPrice) query.pricePerUnit.$gte = Number(minPrice);
        if (maxPrice) query.pricePerUnit.$lte = Number(maxPrice);
      }

      let sortBy = { createdAt: -1 };
      if (sort === 'price_asc') sortBy = { pricePerUnit: 1 };
      else if (sort === 'price_desc') sortBy = { pricePerUnit: -1 };
      else if (sort === 'rating') sortBy = { averageRating: -1 };

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .populate('farmerId', 'name phone district')
        .sort(sortBy)
        .skip(skip)
        .limit(limitNum);

      return ApiResponse.success(res, 'Products fetched successfully', products, 200, {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      });
    } else {
      let filtered = [...inMemoryProducts];

      if (farmerId) {
        filtered = filtered.filter((p) => p.farmer && (p.farmer.id === farmerId || p.farmerId === farmerId));
      } else {
        filtered = filtered.filter((p) => p.approvalStatus === 'APPROVED' && p.isAvailable);
      }

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
      }

      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }

      if (minPrice) {
        filtered = filtered.filter((p) => p.pricePerUnit >= Number(minPrice));
      }

      if (maxPrice) {
        filtered = filtered.filter((p) => p.pricePerUnit <= Number(maxPrice));
      }

      if (sort === 'price_asc') {
        filtered.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
      } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
      } else if (sort === 'rating') {
        filtered.sort((a, b) => b.averageRating - a.averageRating);
      }

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      return ApiResponse.success(res, 'Products fetched successfully (Demo Mode)', paginated, 200, {
        total: filtered.length,
        page: pageNum,
        pages: Math.ceil(filtered.length / limitNum)
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const product = await Product.findById(id).populate('farmerId', 'name phone email avatar address');
      if (!product) {
        return ApiResponse.notFound(res, 'Product not found');
      }
      return ApiResponse.success(res, 'Product retrieved', product);
    } else {
      const product = inMemoryProducts.find((p) => p._id === id || p.id === id);
      if (!product) {
        return ApiResponse.notFound(res, 'Product not found');
      }
      return ApiResponse.success(res, 'Product retrieved (Demo Mode)', product);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create new produce listing (Farmer / Admin)
// @route   POST /api/v1/products
// @access  Private (FARMER, ADMIN)
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      pricePerUnit,
      unit,
      availableStock,
      category,
      farmingPractice,
      images,
      harvestDate
    } = req.body;

    if (!name || !description || !pricePerUnit || availableStock === undefined) {
      return ApiResponse.badRequest(res, 'Please provide name, description, pricePerUnit, and availableStock');
    }

    if (isMongoConnected()) {
      const newProduct = await Product.create({
        farmerId: req.user._id,
        name,
        description,
        pricePerUnit: Number(pricePerUnit),
        unit: unit || 'KG',
        availableStock: Number(availableStock),
        farmingPractice: farmingPractice || 'ORGANIC',
        category: category || 'Vegetables',
        images: images && images.length ? images : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'],
        harvestDate: harvestDate || new Date(),
        approvalStatus: 'APPROVED',
        isAvailable: true
      });

      return ApiResponse.created(res, 'Produce listed successfully', newProduct);
    } else {
      const newProduct = {
        _id: 'prod_' + Date.now(),
        farmerId: req.user.id || req.user._id || 'farmer_001',
        name,
        description,
        pricePerUnit: Number(pricePerUnit),
        unit: unit || 'KG',
        availableStock: Number(availableStock),
        category: category || 'Vegetables',
        farmingPractice: farmingPractice || 'ORGANIC',
        images: images && images.length ? images : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'],
        harvestDate: harvestDate || new Date().toISOString(),
        isAvailable: true,
        approvalStatus: 'APPROVED',
        averageRating: 5.0,
        numReviews: 0,
        farmer: {
          id: req.user.id || 'farmer_001',
          name: req.user.name || 'Farmer Ramesh',
          district: 'Guntur',
          verified: true
        },
        traceability: {
          farmDistrict: 'Guntur',
          harvestBatchNumber: 'BATCH-' + Date.now().toString(36).toUpperCase(),
          soilType: 'Natural Red Soil',
          certifiedOrganic: true
        }
      };

      inMemoryProducts.unshift(newProduct);
      return ApiResponse.created(res, 'Produce listed successfully (Demo Mode)', newProduct);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (FARMER, ADMIN)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      let product = await Product.findById(id);
      if (!product) return ApiResponse.notFound(res, 'Product not found');

      if (product.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return ApiResponse.forbidden(res, 'Not authorized to modify another farmer’s produce listing');
      }

      product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return ApiResponse.success(res, 'Product updated successfully', product);
    } else {
      const index = inMemoryProducts.findIndex((p) => p._id === id || p.id === id);
      if (index === -1) return ApiResponse.notFound(res, 'Product not found');

      inMemoryProducts[index] = { ...inMemoryProducts[index], ...req.body };
      return ApiResponse.success(res, 'Product updated successfully (Demo Mode)', inMemoryProducts[index]);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (FARMER, ADMIN)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const product = await Product.findById(id);
      if (!product) return ApiResponse.notFound(res, 'Product not found');

      if (product.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return ApiResponse.forbidden(res, 'Not authorized to delete this produce');
      }

      await product.deleteOne();
      return ApiResponse.success(res, 'Product deleted successfully');
    } else {
      inMemoryProducts = inMemoryProducts.filter((p) => p._id !== id && p.id !== id);
      return ApiResponse.success(res, 'Product deleted successfully (Demo Mode)');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
