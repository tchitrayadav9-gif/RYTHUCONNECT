# RYTHU CONNECT – Frontend Architecture & Wireframes Plan

## 1. Visual Identity & Color Palette

RythuConnect uses an organic, fresh agricultural theme designed to evoke trust, soil vitality, and transparent trade:

- **Primary Brand Color (Forest Green):** `#15803d` (Tailwind `green-700`) – Header navigation, primary action buttons, verified farmer badges.
- **Secondary Accent (Fresh Emerald):** `#22c55e` (Tailwind `green-500`) – Active status badges, success indicators, interactive tags.
- **Warm Earth Accent (Harvest Amber):** `#d97706` (Tailwind `amber-600`) – Traceability badges, ratings, pending state alerts.
- **Neutral Background (Crisp Farm White):** `#f8fafc` (Tailwind `slate-50`) – Clean, clutter-free content background.
- **Surface Cards (Pure White):** `#ffffff` with subtle borders (`border-slate-200`) and shadow (`shadow-sm`).
- **Typography:** `Inter` / `Plus Jakarta Sans` for clean, accessible legibility across desktop, tablet, and mobile displays.

---

## 2. Navigation Hierarchy & Route Map

```
/ (Home - Hero, Categories, Featured Direct Farm Produce, Farmer Stories)
├── /about (Mission, Farm-to-Fork Model, Middleman Reduction)
├── /how-it-works (Infographic: Harvest -> Direct Quality Check -> Doorstep)
├── /products (Search, Category Filters, Price Slider, Organic Toggle)
├── /products/:id (Gallery, Harvest Date, Farm Origin, Farmer Profile, Reviews)
├── /farmers (Directory of Verified Local Farmers, Farm Locations & Badges)
├── /contact (Support, Helpdesk, Farmer Onboarding Assistance)
├── /login (Multi-role login with role-aware redirection)
├── /register (Customer, Farmer, Bulk Buyer, Delivery Partner onboarding)
│
├── /dashboard/farmer (Role: FARMER)
│   ├── /overview (Sales metrics, recent orders, quick actions)
│   ├── /my-products (Catalog, add new crop, stock toggle, edit)
│   ├── /orders (Incoming orders, accept/reject, mark packed)
│   ├── /kyc-verification (Upload Pattadar/Aadhaar documents)
│   ├── /earnings (Payout analytics, CSV export via Streams)
│   └── /profile (Farm coordinates, bio, primary crops)
│
├── /dashboard/customer (Role: CUSTOMER)
│   ├── /overview (Recent orders, favorite farms, subscription box)
│   ├── /cart & /checkout (Address selection, price breakdown, payment)
│   ├── /orders (Order history, live tracking, delivery OTP)
│   ├── /wishlist (Saved produce items)
│   └── /reviews (Pending product reviews for delivered orders)
│
├── /dashboard/bulk (Role: BULK_BUYER)
│   ├── /quotations (Submit bulk harvest RFQ, negotiated rates)
│   └── /orders (Contract deliveries, recurring logistics)
│
├── /dashboard/delivery (Role: DELIVERY_PARTNER)
│   ├── /assigned (Assigned pickups, route maps, farmer contact)
│   └── /history (Delivered logs, OTP validation interface)
│
└── /dashboard/admin (Role: ADMIN)
    ├── /analytics (Platform GMV, active users, orders count)
    ├── /farmer-approvals (Inspect uploaded KYC, Approve/Reject)
    ├── /products-moderation (Quality inspection, remove illicit listings)
    └── /disputes (Customer complaints, refund approval)
```

---

## 3. Wireframe Concept Outlines

### 3.1 Public Marketplace Wireframe
```
+-----------------------------------------------------------------------------------+
|  [Logo: RythuConnect]   Search produce... [Q]     [Products] [Farmers] [About] [Login] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   HERO SECTION: "From Farmers to Your Homes – Fresh, Fair and Direct"            |
|   [Explore Harvested Today]   [Register as Farmer]                                |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|   CATEGORIES: [🥬 Vegetables]  [🍎 Fruits]  [🌾 Grains]  [🌶️ Spices]  [🥛 Dairy]   |
+-----------------------------------------------------------------------------------+
|   FEATURED PRODUCE (Direct from Verified Farmers)                                 |
|   +-------------------+  +-------------------+  +-------------------+             |
|   | [Img] Fresh Tomato|  | [Img] Shimla Apple|  | [Img] Sona Masoori|             |
|   | Farmer: Ramesh    |  | Farmer: Anita     |  | Farmer: Venkat    |             |
|   | ₹35 / KG          |  | ₹120 / KG         |  | ₹60 / KG          |             |
|   | Harvest: Today    |  | Harvest: 2 days   |  | Harvest: This Week|             |
|   | [Add to Cart]     |  | [Add to Cart]     |  | [Add to Cart]     |             |
|   +-------------------+  +-------------------+  +-------------------+             |
+-----------------------------------------------------------------------------------+
```

### 3.2 Farmer Dashboard Wireframe
```
+-----------------------------------------------------------------------------------+
|  [RythuConnect Farmer Hub]           Welcome, Farmer Ramesh [Verified Badge] [Logout] |
+--------------------+--------------------------------------------------------------+
|  [📊 Overview]     |  QUICK METRICS:                                              |
|  [🥕 My Products]  |  [ Active Products: 8 ] [ Pending Orders: 4 ] [ Revenue: ₹14,200 ]
|  [📦 Orders]       |--------------------------------------------------------------+
|  [📄 KYC & Farm]   |  INCOMING ORDER REQUESTS:                                    |
|  [💰 Earnings/CSV] |  #RC-1042 - 10 KG Tomato, 5 KG Onion - Customer: Priya       |
|  [⚙️ Settings]     |  Status: Placed | Total: ₹525 | [ Accept Order ] [ Reject ]   |
|                    |--------------------------------------------------------------+
|                    |  ACTIVE INVENTORY STATUS:                                    |
|                    |  • Organic Tomatoes: 45 KG remaining [ Edit Stock ]          |
|                    |  • Green Chillies: 12 KG remaining [ Out of Stock Toggle ]   |
+--------------------+--------------------------------------------------------------+
```
