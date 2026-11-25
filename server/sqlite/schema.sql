-- ====================================================================
-- RYTHU CONNECT ACADEMIC RELATIONAL DATABASE (Module 2: SQLite)
-- File: rythu_academic.db
-- Demonstrates: DDL, Constraints (PK, FK, CHECK, UNIQUE, NOT NULL)
-- ====================================================================

-- 1. Farmers Table
CREATE TABLE IF NOT EXISTS farmers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    village TEXT NOT NULL,
    district TEXT NOT NULL,
    acres REAL CHECK (acres > 0),
    is_verified INTEGER DEFAULT 0 CHECK (is_verified IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy')),
    price_per_kg REAL NOT NULL CHECK (price_per_kg > 0),
    stock_kg REAL NOT NULL CHECK (stock_kg >= 0),
    harvest_date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount REAL NOT NULL CHECK (total_amount >= 0),
    status TEXT NOT NULL DEFAULT 'PLACED' CHECK (status IN ('PLACED', 'CONFIRMED', 'DELIVERED', 'CANCELLED')),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 5. Order Items Table (Junction / Line Item Table)
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity_kg REAL NOT NULL CHECK (quantity_kg > 0),
    unit_price REAL NOT NULL CHECK (unit_price > 0),
    subtotal REAL NOT NULL CHECK (subtotal > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
