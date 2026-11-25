const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('FARMER', 'ADMIN'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('FARMER', 'ADMIN'), updateProduct)
  .delete(protect, authorize('FARMER', 'ADMIN'), deleteProduct);

module.exports = router;
