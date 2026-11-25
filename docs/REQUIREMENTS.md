# RYTHU CONNECT – System Requirements & Business Rules

## 1. Functional Requirements

### 1.1 Public Marketplace
- **Produce Catalog:** Unauthenticated guests can search, filter (by price range, category, organic vs. conventional), and view detailed product origins, harvest dates, and farmer profiles.
- **Farmer Directory:** Public directory of verified local farmers, their farm locations, badges, and consumer feedback ratings.
- **Traceability Viewer:** QR code scanning or lookup displaying the farm batch origin, soil conditions, and harvest date.

### 1.2 User Roles & Access Boundaries
1. **FARMER:**
   - Submit KYC documentation (Aadhaar / Pattadar Passbook).
   - Once verified by Admin: Create, edit, and toggle availability of products.
   - Strictly restricted to editing/deleting only their own product listings.
   - View real-time incoming orders, confirm/reject, update inventory, and inspect net payout analytics.
2. **CUSTOMER:**
   - Manage personal profile, delivery addresses, shopping cart, and wishlist.
   - Place orders, view order status in real time, review past delivered items.
   - Strictly prohibited from accessing farmer inventory controls or admin operations.
3. **BULK BUYER:**
   - Dedicated interface for commercial entities (restaurants, caterers, supermarkets).
   - Request customized quotes for harvest volumes (>20kg) with target price points and delivery cadences.
4. **DELIVERY PARTNER:**
   - View assigned order routes, farmer collection points, and customer drop points.
   - Mark order picked up from farm and mark delivered upon successful customer OTP validation.
5. **ADMIN:**
   - Full platform oversight: approve/reject farmer KYC with feedback notes.
   - Moderate product listings, categories, dispute complaints, and inspect revenue analytics.

---

## 2. Strict Business Logic & Rules

1. **KYC Verification Gate:** Only farmers with `verificationStatus: 'APPROVED'` can publish active products. Unverified farmer listings remain in draft mode.
2. **Ownership Guard:** A farmer can only edit or delete a product whose `farmerId` matches their authenticated user ID.
3. **Inventory Integrity:**
   - Customers cannot order a quantity exceeding `availableStock`.
   - Inventory decrements atomically upon successful order confirmation.
   - If an order is cancelled before dispatch, the stock is automatically returned to inventory.
4. **Backend Price Validation:** The server recalculates total prices from database records at checkout. Frontend submitted prices are ignored to prevent tampering.
5. **Delivery OTP Verification:** An order status cannot transition to `DELIVERED` without matching the 6-digit OTP provided to the customer.
6. **Restricted Review Policy:** Reviews and ratings can only be submitted by customers who have a confirmed `DELIVERED` order for that specific product.

---

## 3. Non-Functional & Security Requirements

- **Password Security:** Salted hashing with `bcrypt` (10 rounds). Plaintext passwords must never be stored or returned.
- **Token Security:** Short-lived JWTs (1d) signed with a secure secret key, carrying user ID and role claims.
- **Injection Defense:** Mongoose parameter sanitization prevents NoSQL injection; SQLite queries use parameterized placeholders (`?`).
- **File Upload Limits:** Strict file type validation (images: JPEG, PNG, WEBP; KYC: PDF, JPEG; max size 5MB) via Multer.
- **Error Handling:** Standardized JSON error response without exposing internal server stack traces to clients in production.
- **Rate Limiting:** Protect authentication and search endpoints against abuse.
