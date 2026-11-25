# RYTHU CONNECT – 10 Syllabus Modules to Implementation Mapping

This document provides a comprehensive, 1-to-1 mapping between the 10 backend academic syllabus modules and their practical, real-world implementation within the **RythuConnect** codebase.

---

## Complete Syllabus Matrix

| Module | Academic Topic | Key Concepts Implemented | Core Files & Directories in RythuConnect | Practical Marketplace Feature |
| :--- | :--- | :--- | :--- | :--- |
| **Module 1** | **Node.js & Express.js Fundamentals** | • HTTP Server initialization<br>• Request/Response lifecycle<br>• Modular routing (`express.Router`)<br>• HTTP status codes & standard JSON responses<br>• Environment variable configuration<br>• Global 404 & Centralized error handler | `server/server.js`<br>`server/app.js`<br>`server/routes/index.js`<br>`server/config/env.js` | Server health check, modular API mount points (`/api/v1/*`), environment configuration. |
| **Module 2** | **SQLite & Relational Database Operations** | • Relational Schema Design<br>• Primary Keys, Foreign Keys, Constraints (`CHECK`, `UNIQUE`, `NOT NULL`)<br>• Parameterized SQL queries (Anti-SQLi)<br>• SQL CRUD (`INSERT`, `SELECT`, `UPDATE`, `DELETE`)<br>• Multi-table `JOIN` operations (INNER, LEFT) | `server/sqlite/database.js`<br>`server/sqlite/schema.sql`<br>`server/sqlite/queries.js`<br>`server/controllers/academicSqliteController.js`<br>`server/routes/academicSqliteRoutes.js` | Academic database (`rythu_academic.db`) demonstrating relational reporting on farmers, product pricing, and order line items. |
| **Module 3** | **RESTful API Development & Validation** | • REST architectural constraints<br>• Query parameters (filtering, sorting)<br>• Route parameters (`:id`)<br>• Request payload validation<br>• Standardized API response format (`{ success, data, error, meta }`) | `server/validators/*`<br>`server/controllers/*`<br>`server/routes/*`<br>`server/utils/apiResponse.js` | Full REST CRUD for Products, Categories, Cart, Orders, and Farmer Profiles. |
| **Module 4** | **Authentication & User Management** | • Password hashing with `bcrypt`<br>• Salt rounds & safe comparison<br>• JWT generation (`sign`) & expiration<br>• JWT validation & token extraction (`Bearer`)<br>• Secure cookie / Auth header management | `server/controllers/authController.js`<br>`server/utils/jwt.js`<br>`server/models/User.js`<br>`server/routes/authRoutes.js` | Multi-role registration & login for Farmer, Customer, Bulk Buyer, Delivery Partner, Admin. |
| **Module 5** | **Middleware, Authorization & Error Handling** | • Custom Express middleware chain<br>• Authentication guard (`verifyToken`)<br>• Role-Based Access Control (`authorizeRoles`)<br>• Ownership guard (e.g. Farmer owns Product)<br>• HTTP Request Logger (Morgan/Custom)<br>• Global error-handling middleware | `server/middleware/authMiddleware.js`<br>`server/middleware/roleMiddleware.js`<br>`server/middleware/loggerMiddleware.js`<br>`server/middleware/errorMiddleware.js`<br>`server/middleware/validateMiddleware.js` | Restricting product creation to verified Farmers; cart/order access to Customers; system audit logs. |
| **Module 6** | **File Handling & Asynchronous Operations** | • Node.js `fs` and `fs/promises`<br>• Asynchronous File I/O (async/await, promises)<br>• Multer disk storage and memory streaming<br>• MIME type & file size boundary validation<br>• Cloudinary integration for permanent media storage | `server/utils/fileHandler.js`<br>`server/middleware/uploadMiddleware.js`<br>`server/services/cloudinaryService.js`<br>`server/controllers/fileUploadController.js` | Uploading farmer KYC identity documents, farm land certificates, and high-resolution produce images. |
| **Module 7** | **Streams & Data Processing** | • Node.js `Readable`, `Writable`, and `Transform` streams<br>• Stream Piping (`readable.pipe(...)`)<br>• Backpressure management & chunk processing<br>• Dynamic CSV generation without memory spikes | `server/streams/csvExportStream.js`<br>`server/streams/csvParserStream.js`<br>`server/controllers/streamController.js`<br>`server/routes/streamRoutes.js` | Streaming large monthly farmer revenue reports and order receipts directly to client download as CSV. |
| **Module 8** | **MongoDB & Node.js Integration** | • MongoDB Atlas connection with Mongoose<br>• Schema design, field constraints, timestamps<br>• Schema validation rules<br>• Mongoose Discriminators & ObjectId references<br>• Single-field and Compound Indexing | `server/config/db.js`<br>`server/models/User.js`<br>`server/models/Product.js`<br>`server/models/Order.js`<br>(All 13 Mongoose models) | Full persistence layer of the RythuConnect marketplace with connected relationships and high performance indexes. |
| **Module 9** | **MongoDB CRUD APIs & Query Operations** | • Advanced Mongoose queries (`find`, `aggregate`)<br>• Case-insensitive regex text search<br>• Range filtering (`$gte`, `$lte`) on price & harvest date<br>• Sorting by price, date, and rating<br>• Pagination (`skip`, `limit`, total pages) | `server/controllers/productController.js`<br>`server/controllers/orderController.js`<br>`server/utils/apiFeatures.js` | Interactive customer marketplace search: e.g. `GET /api/v1/products?search=tomato&category=organic&minPrice=20&maxPrice=60&sort=price_asc&page=1&limit=10`. |
| **Module 10** | **Secure MongoDB APIs & Backend Integration** | • End-to-end integration of Auth + CRUD + DB<br>• Atomic inventory adjustments on checkout<br>• Safe order state-machine transitions (`PENDING` -> `CONFIRMED` -> `OUT_FOR_DELIVERY` -> `DELIVERED`)<br>• Backend price validation (never trust frontend totals)<br>• Escrow and payment verification | `server/controllers/orderController.js`<br>`server/controllers/paymentController.js`<br>`server/services/inventoryService.js`<br>`server/routes/orderRoutes.js` | Full e-commerce transactional pipeline from cart checkout to stock decrement and delivery OTP validation. |

---

## Academic Demonstration Endpoints

In addition to the live e-commerce API routes, specific academic routes exist for students to demonstrate syllabus requirements to evaluators:

1. **Module 2 (SQLite Demonstration):**
   - `GET /api/v1/academic/sqlite/schema` -> Returns DDL table creation statements and constraints.
   - `GET /api/v1/academic/sqlite/farmers-products` -> Executes parameterized SQL `INNER JOIN` query between farmers and products.
   - `POST /api/v1/academic/sqlite/seed` -> Populates sample academic relational records.
2. **Module 6 (File Operations Lab):**
   - `GET /api/v1/academic/files/async-demo` -> Demonstrates asynchronous file read/write using Node.js `fs.promises`.
3. **Module 7 (Streams Pipeline):**
   - `GET /api/v1/academic/streams/export-sales-csv` -> Streams sales data through a Transform stream straight into the HTTP response.
