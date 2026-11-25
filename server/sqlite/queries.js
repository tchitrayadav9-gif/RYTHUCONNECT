/**
 * SQLite Academic Queries & Relational Operations (Module 2)
 * Demonstrates: Parameterized queries, CRUD, Aggregations, Inner Joins, Left Joins.
 */
const db = require('./database');

// Helper to wrap db.all in a Promise
const runQueryAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Helper to wrap db.run in a Promise
const runQueryExecute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

/**
 * 1. SELECT all farmers with verification status (DML SELECT)
 */
const getAllFarmers = () => {
  return runQueryAll('SELECT id, name, phone, village, district, acres, is_verified, created_at FROM farmers');
};

/**
 * 2. Parameterized INSERT for Product (Anti-SQLi Demonstration)
 */
const addProduct = (farmerId, name, category, price, stock, harvestDate) => {
  const sql = `
    INSERT INTO products (farmer_id, product_name, category, price_per_kg, stock_kg, harvest_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return runQueryExecute(sql, [farmerId, name, category, price, stock, harvestDate]);
};

/**
 * 3. Parameterized UPDATE (Stock adjustment)
 */
const updateProductStock = (productId, newStock) => {
  const sql = 'UPDATE products SET stock_kg = ? WHERE id = ?';
  return runQueryExecute(sql, [newStock, productId]);
};

/**
 * 4. Parameterized DELETE
 */
const deleteProduct = (productId) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  return runQueryExecute(sql, [productId]);
};

/**
 * 5. Relational INNER JOIN: Farmers with their listed produce
 */
const getFarmersWithProductsJoin = () => {
  const sql = `
    SELECT 
      f.id AS farmer_id,
      f.name AS farmer_name,
      f.district,
      f.village,
      p.id AS product_id,
      p.product_name,
      p.category,
      p.price_per_kg,
      p.stock_kg,
      p.harvest_date
    FROM farmers f
    INNER JOIN products p ON f.id = p.farmer_id
    ORDER BY f.name ASC, p.product_name ASC;
  `;
  return runQueryAll(sql);
};

/**
 * 6. Complex Multi-Table JOIN: Customer orders itemized with product and farmer details
 */
const getOrderDetailsJoin = () => {
  const sql = `
    SELECT 
      o.id AS order_id,
      o.order_date,
      o.status,
      c.name AS customer_name,
      c.city AS customer_city,
      p.product_name,
      f.name AS farmer_name,
      oi.quantity_kg,
      oi.unit_price,
      oi.subtotal
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    JOIN farmers f ON p.farmer_id = f.id
    ORDER BY o.order_date DESC;
  `;
  return runQueryAll(sql);
};

module.exports = {
  getAllFarmers,
  addProduct,
  updateProductStock,
  deleteProduct,
  getFarmersWithProductsJoin,
  getOrderDetailsJoin,
  runQueryAll,
  runQueryExecute
};
