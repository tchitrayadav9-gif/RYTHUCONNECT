const express = require('express');
const router = express.Router();
const {
  getSqliteSchema,
  getFarmersProductsJoin,
  getOrderDetailsJoin,
  createProductSqlite
} = require('../controllers/academicSqliteController');

// Module 2 Academic Evaluation Endpoints
router.get('/schema', getSqliteSchema);
router.get('/join-farmers-products', getFarmersProductsJoin);
router.get('/join-order-details', getOrderDetailsJoin);
router.post('/products', createProductSqlite);

module.exports = router;
