# RYTHU CONNECT (రైతు కనెక్ట్)
> **From Farmers to Your Homes – Fresh, Fair and Direct.**  
> *A Smart Farmer-to-Customer Marketplace built with MERN Stack + SQLite Academic Module.*

---

## 🌾 Project Overview

**RythuConnect** is an enterprise-grade agricultural e-commerce platform designed to bridge the gap between rural farmers and urban consumers/bulk institutions. It eliminates predatory middlemen, enforces fair price transparency, provides farm-to-fork batch traceability via QR codes, and ensures verified direct commerce.

The project simultaneously serves as a comprehensive, real-world practical implementation of **all 10 backend syllabus modules** of the 1st-year computer science curriculum.

---

## 🏛️ Architecture & Dual Database Strategy

```
                                  +-----------------------+
                                  |   React.js Frontend   |
                                  | (Vite + Tailwind CSS) |
                                  +-----------+-----------+
                                              |
                                              | HTTPS / JSON (REST)
                                              v
                                  +-----------------------+
                                  |   Node.js / Express   |
                                  |     REST API Server   |
                                  +-----+-----------+-----+
                                        |           |
            +---------------------------+           +--------------------------+
            |                                                                  |
            v                                                                  v
+-----------------------+                                          +-----------------------+
|     MongoDB Atlas     |                                          |   SQLite Database     |
|   (Production DB)     |                                          |  (Academic Module)    |
| • 13 Collections      |                                          | • 5 Relational Tables |
| • Products, Orders    |                                          | • Constraints & Joins |
| • Users, Deliveries   |                                          | • 'rythu_academic.db' |
+-----------------------+                                          +-----------------------+
```

---

## 👥 Five User Roles & Dashboards

1. **🌾 Farmer Dashboard:** Manage crop listings, live inventory, incoming orders, KYC verification documents, direct payouts, and sales CSV streaming.
2. **🛒 Customer Dashboard:** Browse verified produce, smart price comparisons, cart & checkout, order tracking, and post-delivery reviews.
3. **🏢 Bulk Buyer Dashboard:** Commercial procurement for restaurants, supermarkets, and hotels; request volume quotations (>20kg) and negotiate crop batch contracts.
4. **🚚 Delivery Partner Dashboard:** Route navigation, farm pickup validation, customer location dispatch, and delivery confirmation via customer OTP.
5. **🛡️ Admin Dashboard:** KYC approval workflow for farmers, catalog moderation, dispute resolution, and system-wide revenue analytics.

---

## 📚 10 Academic Syllabus Modules Mapping

Every single syllabus module is practically integrated into the codebase:
- **Module 1:** Node.js & Express Fundamentals (`server/app.js`, `server/server.js`, `server/routes/`)
- **Module 2:** SQLite & Relational Database Operations (`server/sqlite/database.js`, `schema.sql`, `queries.js`)
- **Module 3:** RESTful API Development & Validation (`server/validators/`, `server/controllers/`, `server/utils/apiResponse.js`)
- **Module 4:** Authentication & User Management (`server/controllers/authController.js`, `server/utils/jwt.js`)
- **Module 5:** Middleware, Authorization & Error Handling (`server/middleware/authMiddleware.js`, `roleMiddleware.js`, `errorMiddleware.js`)
- **Module 6:** File Handling & Asynchronous Operations (`server/utils/fileHandler.js`, `server/middleware/uploadMiddleware.js`, Multer + Cloudinary)
- **Module 7:** Streams & Data Processing (`server/streams/csvExportStream.js`, `server/controllers/streamController.js`)
- **Module 8:** MongoDB & Node.js Integration (`server/config/db.js`, `server/models/*` - 13 Mongoose models)
- **Module 9:** MongoDB CRUD APIs & Query Operations (`server/controllers/productController.js`, `server/utils/apiFeatures.js`)
- **Module 10:** Secure MongoDB APIs & Transactions (`server/controllers/orderController.js`, `server/services/inventoryService.js`)

---

## 📁 Repository Structure

```
rythu-connect/
├── client/                     # React.js Frontend (Vite, Tailwind, Context API)
│   ├── public/
│   └── src/
│       ├── assets/             # Agricultural imagery & icons
│       ├── components/         # Reusable UI (Navbar, ProductCard, Modals)
│       ├── context/            # AuthContext, CartContext
│       ├── dashboards/         # 5 role-specific dashboards
│       ├── layouts/            # Dashboard & Public layouts
│       ├── pages/              # Public pages (Home, Products, About, etc.)
│       ├── routes/             # Protected & Role-based routes
│       └── services/           # Axios API services
├── server/                     # Node.js & Express REST Backend
│   ├── config/                 # Database & Environment configuration
│   ├── controllers/            # Request handlers (MVC Architecture)
│   ├── middleware/             # Auth, RBAC, Logger, Error handlers
│   ├── models/                 # 13 Mongoose schemas & models
│   ├── routes/                 # Modular API route definitions
│   ├── services/               # Inventory, Cloudinary, Payment services
│   ├── sqlite/                 # Academic SQLite database, schema & queries
│   ├── streams/                # Stream-based CSV report pipelines
│   ├── tests/                  # Automated integration tests
│   ├── utils/                  # JWT, API response & error utilities
│   ├── validators/             # Request payload validation schemas
│   ├── app.js                  # Express application setup
│   └── server.js               # HTTP server entry point
├── docs/                       # Comprehensive Project & Academic Documentation
│   ├── PROJECT_OVERVIEW.md     # Vision, stakeholders, and architecture
│   ├── SYLLABUS_MAPPING.md     # Detailed 10-module academic mapping
│   ├── DATABASE_DESIGN.md      # MongoDB 13 models + SQLite relational schema
│   ├── REQUIREMENTS.md         # Functional, business rules & security specs
│   ├── FRONTEND_WIREFRAMES.md  # UI design system & page layouts
│   └── CHECKLIST.md            # Phase-by-phase execution checklist
├── .gitignore
└── README.md
```

---

## 🚀 Development Phases

- [x] **Phase 1:** Planning, Repository Inspection, Architecture Design & Documentation
- [ ] **Phase 2:** Node.js & Express Fundamentals (Module 1)
- [ ] **Phase 3:** SQLite & Relational Database Operations (Module 2)
- [ ] **Phase 4:** RESTful API Development & Validation (Module 3)
- [ ] **Phase 5:** Authentication & Middleware (Modules 4 & 5)
- [ ] **Phase 6:** File Handling & Streams (Modules 6 & 7)
- [ ] **Phase 7:** MongoDB Integration & Secure APIs (Modules 8, 9 & 10)
- [ ] **Phase 8:** React Frontend & 5 Dashboards
- [ ] **Phase 9:** End-to-End Marketplace Workflows
- [ ] **Phase 10:** Comprehensive Testing, Documentation & Deployment

---

## 📜 Documentation Index

For in-depth explanations, consult the documents in the `docs/` folder:
- [docs/PROJECT_OVERVIEW.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/PROJECT_OVERVIEW.md)
- [docs/SYLLABUS_MAPPING.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/SYLLABUS_MAPPING.md)
- [docs/DATABASE_DESIGN.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/DATABASE_DESIGN.md)
- [docs/REQUIREMENTS.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/REQUIREMENTS.md)
- [docs/FRONTEND_WIREFRAMES_PLAN.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/FRONTEND_WIREFRAMES_PLAN.md)
- [docs/CHECKLIST.md](file:///c:/Users/tchit/OneDrive/Desktop/RYTHUCONNECT/docs/CHECKLIST.md)
