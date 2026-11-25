# RYTHU CONNECT – Development Checklist & Syllabus Tracker

## 1. Project Phase Tracker

- [x] **PHASE 1: Repository Inspection, Architecture Design & Planning**
  - [x] Inspect project directory & verify environment.
  - [x] Define system architecture & Dual-Database strategy (MongoDB + SQLite).
  - [x] Map all 10 academic syllabus modules to specific implementation files.
  - [x] Scaffold directory structure (`client/`, `server/`, `docs/`).
  - [x] Design 13 MongoDB collections (Mongoose schemas) & 5 SQLite relational tables.
  - [x] Establish frontend wireframes, color palette, and navigation route hierarchy.
  - [x] Formulate development checklist and project documentation baseline.

- [ ] **PHASE 2: Backend Foundation – Node.js & Express Fundamentals (Module 1)**
  - [ ] Initialize `server/package.json` with required dependencies.
  - [ ] Create `server/config/env.js` with environment validation.
  - [ ] Build Express HTTP server in `server/app.js` and `server/server.js`.
  - [ ] Setup modular routing architecture in `server/routes/index.js`.
  - [ ] Implement standardized API responses (`server/utils/apiResponse.js`).
  - [ ] Implement central error handling and 404 handler.
  - [ ] Verify server startup and test initial HTTP endpoints.

- [ ] **PHASE 3: Academic RDBMS Module – SQLite Operations (Module 2)**
  - [ ] Configure `better-sqlite3` or `sqlite3` driver in `server/sqlite/database.js`.
  - [ ] Create `server/sqlite/schema.sql` (tables, constraints, foreign keys).
  - [ ] Implement parameterized SQL CRUD in `server/sqlite/queries.js`.
  - [ ] Implement multi-table relational `JOIN` queries.
  - [ ] Build academic demonstration routes & controller (`server/controllers/academicSqliteController.js`).
  - [ ] Document SQL queries in `docs/SQLITE_QUERIES.md` and test endpoints.

- [ ] **PHASE 4: RESTful API Development & Request Validation (Module 3)**
  - [ ] Implement validation middleware with `express-validator` or Joi.
  - [ ] Build REST controllers with pagination, filtering, and sorting parameter extraction.
  - [ ] Standardize error codes and HTTP response envelopes.
  - [ ] Prepare Postman API collection for testing.

- [ ] **PHASE 5: Authentication, Middleware & Role-Based Authorization (Modules 4 & 5)**
  - [ ] Implement `bcrypt` password hashing and salt handling.
  - [ ] Implement JWT generation, signing, and verification utilities.
  - [ ] Create auth controllers (register, login, me, logout).
  - [ ] Build authentication guard middleware (`verifyToken`).
  - [ ] Build role-based authorization middleware (`authorizeRoles('FARMER', 'ADMIN', ...)`).
  - [ ] Implement request logging middleware.
  - [ ] Test role security and route protection.

- [ ] **PHASE 6: File Handling & Stream Processing (Modules 6 & 7)**
  - [ ] Implement Node.js `fs` file operations (sync, async/await demonstrations).
  - [ ] Configure Multer storage engine for image & KYC document uploads.
  - [ ] Integrate Cloudinary upload service for secure storage.
  - [ ] Implement Node.js Readable, Writable, and Transform streams (`server/streams/`).
  - [ ] Build CSV stream export for farmer revenue reports and sales summaries.
  - [ ] Test stream backpressure and memory efficiency.

- [ ] **PHASE 7: Production Database – MongoDB & Secure Marketplace APIs (Modules 8, 9 & 10)**
  - [ ] Connect MongoDB Atlas with Mongoose connection pooling and error listeners.
  - [ ] Create all 13 Mongoose schemas and models with indexing and validations.
  - [ ] Implement full MongoDB CRUD controllers with query operators (`$regex`, `$gte`, `$lte`).
  - [ ] Implement atomic inventory updates and transactional order creation.
  - [ ] Implement delivery partner OTP verification and payment verification.
  - [ ] Perform comprehensive API testing across all modules.

- [ ] **PHASE 8: React Frontend Development & 5 Role Dashboards**
  - [ ] Initialize React frontend with Vite, Tailwind CSS, Lucide icons, and React Router.
  - [ ] Build public pages: Home, Products Catalog, Product Details, Farmers Directory, About, Auth.
  - [ ] Implement AuthContext & Axios interceptors with JWT state management.
  - [ ] Build Farmer Dashboard (Inventory, Product CRUD, Incoming Orders, Sales Analytics).
  - [ ] Build Customer Dashboard (Cart, Checkout, Order Tracking, Reviews).
  - [ ] Build Bulk Buyer Dashboard (Quotations, Harvest Requests).
  - [ ] Build Delivery Partner Dashboard (Route Pickups, OTP Handover).
  - [ ] Build Admin Dashboard (KYC Verification, Moderation, System Analytics).

- [ ] **PHASE 9: End-to-End Marketplace Integration & Business Logic**
  - [ ] Connect cart, checkout, and inventory decrement end-to-end.
  - [ ] Connect farmer document upload and admin verification workflow.
  - [ ] Integrate delivery partner OTP verification flow.
  - [ ] Test customer reviews validation (only for delivered items).

- [ ] **PHASE 10: Testing, Documentation Finalization & Deployment Preparation**
  - [ ] Run automated API tests and generate `docs/TESTING_REPORT.md`.
  - [ ] Finalize Postman collection and environment files.
  - [ ] Complete all academic documentation (`AUTH_GUIDE.md`, `FILE_HANDLING_GUIDE.md`, `STREAMS_GUIDE.md`, `DEPLOYMENT_GUIDE.md`).
  - [ ] Final demonstration readiness check.

---

## 2. Academic Syllabus Completion Tracker

| Syllabus Module | Status | Deliverable File / Directory |
| :--- | :--- | :--- |
| **Module 1: Node.js & Express Fundamentals** | In Progress (Phase 2) | `server/server.js`, `server/app.js`, `server/routes/` |
| **Module 2: SQLite & Relational Database** | Pending (Phase 3) | `server/sqlite/database.js`, `schema.sql`, `queries.js` |
| **Module 3: RESTful APIs & Validation** | Pending (Phase 4) | `server/validators/`, `server/controllers/` |
| **Module 4: Authentication & User Management** | Pending (Phase 5) | `server/controllers/authController.js`, `server/utils/jwt.js` |
| **Module 5: Middleware & RBAC** | Pending (Phase 5) | `server/middleware/authMiddleware.js`, `roleMiddleware.js` |
| **Module 6: File Handling & Async Operations** | Pending (Phase 6) | `server/utils/fileHandler.js`, `server/middleware/uploadMiddleware.js` |
| **Module 7: Streams & Data Processing** | Pending (Phase 6) | `server/streams/csvExportStream.js`, `streamController.js` |
| **Module 8: MongoDB & Node.js Integration** | Pending (Phase 7) | `server/config/db.js`, `server/models/*` (13 models) |
| **Module 9: MongoDB CRUD & Query Operations** | Pending (Phase 7) | `server/controllers/productController.js`, `apiFeatures.js` |
| **Module 10: Secure MongoDB APIs & Transactions** | Pending (Phase 7) | `server/services/inventoryService.js`, `orderController.js` |
