/**
 * Academic SQLite Controller (Module 2: Relational Database Operations)
 * Demonstrates: DDL, Constraints, Parameterized Anti-SQLi CRUD, Relational Multi-Table Joins.
 */
const queries = require('../sqlite/queries');
const ApiResponse = require('../utils/apiResponse');
const fs = require('fs');
const path = require('path');

// @desc    Get SQLite DDL Schema Statements
// @route   GET /api/v1/academic/sqlite/schema
// @access  Public
const getSqliteSchema = (req, res, next) => {
  try {
    const schemaPath = path.resolve(__dirname, '../sqlite/schema.sql');
    const sqlContent = fs.readFileSync(schemaPath, 'utf8');

    return ApiResponse.success(res, 'Academic SQLite schema DDL statements', {
      databaseFile: 'rythu_academic.db',
      schemaSql: sqlContent,
      tables: ['farmers', 'customers', 'products', 'orders', 'order_items'],
      constraintsDemonstrated: ['PRIMARY KEY', 'FOREIGN KEY with CASCADE', 'CHECK', 'UNIQUE', 'NOT NULL']
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Execute Relational JOIN query (Farmers + Products)
// @route   GET /api/v1/academic/sqlite/join-farmers-products
// @access  Public
const getFarmersProductsJoin = async (req, res, next) => {
  try {
    const results = await queries.getFarmersWithProductsJoin();
    return ApiResponse.success(res, 'SQL INNER JOIN (farmers JOIN products) results', {
      sql: 'SELECT f.name AS farmer_name, f.district, p.product_name, p.category, p.price_per_kg, p.stock_kg FROM farmers f INNER JOIN products p ON f.id = p.farmer_id',
      rowCount: results.length,
      rows: results
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Execute Complex 4-Table JOIN query (Orders + Customers + OrderItems + Products + Farmers)
// @route   GET /api/v1/academic/sqlite/join-order-details
// @access  Public
const getOrderDetailsJoin = async (req, res, next) => {
  try {
    const results = await queries.getOrderDetailsJoin();
    return ApiResponse.success(res, 'SQL Multi-Table Relational JOIN (orders + customers + order_items + products + farmers)', {
      sql: 'SELECT o.id, c.name, p.product_name, f.name, oi.quantity_kg, oi.unit_price, oi.subtotal FROM orders o JOIN customers c ON o.customer_id = c.id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN farmers f ON p.farmer_id = f.id',
      rowCount: results.length,
      rows: results
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Demonstrate Parameterized INSERT into SQLite
// @route   POST /api/v1/academic/sqlite/products
// @access  Public
const createProductSqlite = async (req, res, next) => {
  try {
    const { farmerId, name, category, price, stock, harvestDate } = req.body;
    if (!farmerId || !name || !price || !stock) {
      return ApiResponse.badRequest(res, 'Please provide farmerId, name, price, and stock for SQL INSERT');
    }

    const result = await queries.addProduct(
      farmerId,
      name,
      category || 'Vegetables',
      Number(price),
      Number(stock),
      harvestDate || new Date().toISOString().slice(0, 10)
    );

    return ApiResponse.created(res, 'Parameterized SQL INSERT executed successfully', {
      queryType: 'PARAMETERIZED INSERT (Anti-SQLi)',
      insertedId: result.lastID,
      affectedRows: result.changes
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSqliteSchema,
  getFarmersProductsJoin,
  getOrderDetailsJoin,
  createProductSqlite
};
