/**
 * Category Controller
 */
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');
const { isMongoConnected } = require('../config/db');

const defaultCategories = [
  { _id: 'cat_01', name: 'Vegetables', slug: 'vegetables', icon: 'Salad', description: 'Farm fresh organic vegetables picked daily', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80' },
  { _id: 'cat_02', name: 'Fruits', slug: 'fruits', icon: 'Apple', description: 'Tree-ripened sweet and natural seasonal fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80' },
  { _id: 'cat_03', name: 'Grains & Pulses', slug: 'grains', icon: 'Wheat', description: 'Traditional unpolished rice, millets, and pulses', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { _id: 'cat_04', name: 'Spices', slug: 'spices', icon: 'Flame', description: 'Pure aromatic turmeric, red chillies, and whole spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80' },
  { _id: 'cat_05', name: 'Dairy & Ghee', slug: 'dairy', icon: 'Milk', description: 'Desi cow A2 milk, bilona ghee, and country butter', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' }
];

const getCategories = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      let categories = await Category.find({ isActive: true });
      if (!categories.length) {
        categories = defaultCategories;
      }
      return ApiResponse.success(res, 'Categories fetched successfully', categories);
    } else {
      return ApiResponse.success(res, 'Categories fetched successfully (Demo Mode)', defaultCategories);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories
};
