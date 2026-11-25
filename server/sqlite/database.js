/**
 * SQLite Academic Database Connection & Setup (Module 2)
 */
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, 'rythu_academic.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite academic database:', err.message);
  } else {
    console.log('✅ SQLite academic database connected at:', dbPath);
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    // Enable Foreign Key support in SQLite
    db.run('PRAGMA foreign_keys = ON;');

    // Read and execute schema
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql, (err) => {
      if (err) {
        console.error('❌ Error applying SQLite schema:', err.message);
      } else {
        console.log('✅ SQLite academic tables verified/created successfully.');
        seedSampleDataIfEmpty();
      }
    });
  });
}

function seedSampleDataIfEmpty() {
  db.get('SELECT COUNT(*) AS count FROM farmers', (err, row) => {
    if (err) return console.error('Error checking SQLite farmers count:', err);
    if (row && row.count === 0) {
      console.log('🌱 Seeding initial academic SQLite relational demo data...');

      db.serialize(() => {
        // Insert Farmers
        const stmtFarmer = db.prepare(
          'INSERT INTO farmers (name, phone, village, district, acres, is_verified) VALUES (?, ?, ?, ?, ?, ?)'
        );
        stmtFarmer.run('Ramana Reddy', '9876543210', 'Bhimavaram', 'West Godavari', 4.5, 1);
        stmtFarmer.run('Saraswathi Devi', '9876543211', 'Gudivada', 'Krishna', 2.0, 1);
        stmtFarmer.run('Venkatesh Rao', '9876543212', 'Chittoor Rural', 'Chittoor', 6.0, 1);
        stmtFarmer.finalize();

        // Insert Customers
        const stmtCustomer = db.prepare(
          'INSERT INTO customers (name, email, phone, city) VALUES (?, ?, ?, ?)'
        );
        stmtCustomer.run('Priya Sharma', 'priya@example.com', '9123456780', 'Hyderabad');
        stmtCustomer.run('Rahul Verma', 'rahul@example.com', '9123456781', 'Vijayawada');
        stmtCustomer.finalize();

        // Insert Products
        const stmtProd = db.prepare(
          'INSERT INTO products (farmer_id, product_name, category, price_per_kg, stock_kg, harvest_date) VALUES (?, ?, ?, ?, ?, ?)'
        );
        stmtProd.run(1, 'Country Tomatoes', 'Vegetables', 35.0, 250.0, '2026-11-24');
        stmtProd.run(1, 'Guntur Red Chillies', 'Spices', 180.0, 100.0, '2026-11-20');
        stmtProd.run(2, 'Banginapalli Mangoes', 'Fruits', 120.0, 500.0, '2026-11-22');
        stmtProd.run(3, 'Sona Masoori Rice', 'Grains', 60.0, 1000.0, '2026-11-15');
        stmtProd.finalize();

        // Insert Orders & Order Items
        db.run(
          'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)',
          [1, 350.0, 'CONFIRMED'],
          function (err) {
            if (!err) {
              const orderId = this.lastID;
              const stmtItem = db.prepare(
                'INSERT INTO order_items (order_id, product_id, quantity_kg, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)'
              );
              stmtItem.run(orderId, 1, 10.0, 35.0, 350.0);
              stmtItem.finalize();
              console.log('✅ Academic SQLite sample records seeded.');
            }
          }
        );
      });
    }
  });
}

module.exports = db;
