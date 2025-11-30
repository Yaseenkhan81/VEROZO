<<<<<<< HEAD
# System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Pages    │ Components │  Context   │   Assets    │    │
│  │  (Routes)  │   (UI)     │  (State)   │  (Images)   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API Calls
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Routes   │Controllers │ Middleware │   Models    │    │
│  │  (API)     │ (Logic)    │  (Auth)    │ (Schemas)   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
└──────────────┬────────────┬────────────┬───────────────────┘
               │            │            │
               ▼            ▼            ▼
        ┌───────────┐ ┌──────────┐ ┌──────────┐
        │  MongoDB  │ │Cloudinary│ │ Payment  │
        │  Database │ │  Images  │ │ Gateway  │
        └───────────┘ └──────────┘ └──────────┘
```

---

## 🔄 Data Flow

### User Journey: Browse → Add to Cart → Checkout

```
1. USER VISITS WEBSITE
   ↓
2. Frontend loads from /src
   - React components render
   - Context API initializes
   - Products loaded from assets.js
   ↓
3. USER BROWSES PRODUCTS
   - Collection page shows all products
   - Filters applied in frontend
   - No backend call needed (using static data)
   ↓
4. USER ADDS TO CART
   - Context updates cartItems state
   - Cart count updates in navbar
   - Toast notification shown
   ↓
5. USER GOES TO CHECKOUT
   - Cart data from Context
   - User fills delivery form
   - Selects payment method
   ↓
6. USER PLACES ORDER
   - Frontend → POST /api/order/place
   - Backend creates order in MongoDB
   - Cart cleared
   - Success message shown
```

---

## 🗂️ Frontend Architecture

### Component Hierarchy

```
App.jsx (Router)
├── Navbar (always visible)
│   ├── Logo
│   ├── Navigation Links
│   ├── Search Icon
│   ├── Profile Icon
│   ├── Cart Icon (with count)
│   └── Mobile Menu
│
├── SearchBar (conditional)
│
├── Routes (pages)
│   ├── Home
│   │   ├── Hero
│   │   ├── LatestCollection
│   │   ├── BestSeller
│   │   ├── OurPolicy
│   │   └── NewsletterBox
│   │
│   ├── Collection
│   │   ├── Filter Sidebar
│   │   ├── Sort Dropdown
│   │   └── ProductItem (grid)
│   │
│   ├── Product/:productId
│   │   ├── Image Gallery
│   │   ├── Product Info
│   │   ├── Size Selection
│   │   ├── Add to Cart Button
│   │   └── RelatedProducts
│   │
│   ├── Cart
│   │   ├── Cart Items List
│   │   ├── Quantity Controls
│   │   ├── CartTotal
│   │   └── Checkout Button
│   │
│   ├── PlaceOrder
│   │   ├── Delivery Form
│   │   ├── CartTotal
│   │   └── Payment Selection
│   │
│   ├── Orders
│   │   └── Order List
│   │
│   ├── Login
│   │   └── Login/Register Form
│   │
│   ├── About
│   │   └── Company Info
│   │
│   └── Contact
│       └── Contact Form
│
└── Footer (always visible)
```

### State Management (Context API)

```javascript
ShopContext provides:
├── products (array of 52 products)
├── currency ('$')
├── delivery_fee (10)
├── search (string)
├── showSearch (boolean)
├── cartItems (object)
├── setSearch (function)
├── setShowSearch (function)
├── addToCart (function)
├── updateQuantity (function)
├── getCartCount (function)
├── getCartAmount (function)
└── navigate (function)
```

---

## 🔧 Backend Architecture

### API Endpoint Structure

```
/api
├── /user
│   ├── POST /register        → registerUser()
│   ├── POST /login          → loginUser()
│   └── POST /admin          → adminLogin()
│
├── /product
│   ├── GET  /list           → listProducts()
│   ├── POST /single         → singleProduct()
│   ├── POST /add [admin]    → addProduct()
│   └── POST /remove [admin] → removeProduct()
│
├── /cart
│   ├── POST /get [auth]     → getUserCart()
│   ├── POST /add [auth]     → addToCart()
│   └── POST /update [auth]  → updateCart()
│
└── /order
    ├── POST /place [auth]        → placeOrder()
    ├── POST /stripe [auth]       → placeOrderStripe()
    ├── POST /razorpay [auth]     → placeOrderRazorpay()
    ├── POST /userorders [auth]   → userOrders()
    ├── POST /list [admin]        → allOrders()
    ├── POST /status [admin]      → updateStatus()
    ├── POST /verifyStripe [auth] → verifyStripe()
    └── POST /verifyRazorpay [auth] → verifyRazorpay()
```

### Middleware Flow

```
Request → Middleware → Controller → Response

Example: Add to Cart
1. Request: POST /api/cart/add
2. Middleware: authUser (verify JWT token)
3. Controller: addToCart (business logic)
4. Database: Update user's cartData
5. Response: { success: true, message: "Added To Cart" }
```

---

## 💾 Database Schema Relations

```
┌─────────────┐
│    Users    │
├─────────────┤
│ _id         │───┐
│ name        │   │
│ email       │   │
│ password    │   │
│ cartData    │   │
└─────────────┘   │
                  │
                  │ userId (reference)
                  │
                  ├────────────────────┐
                  │                    │
                  ▼                    ▼
         ┌─────────────┐      ┌─────────────┐
         │   Orders    │      │    Cart     │
         ├─────────────┤      │  (embedded) │
         │ _id         │      └─────────────┘
         │ userId      │
         │ items       │───┐
         │ amount      │   │
         │ address     │   │
         │ status      │   │
         │ payment     │   │
         └─────────────┘   │
                           │
                           │ item references
                           │
                           ▼
                  ┌─────────────┐
                  │  Products   │
                  ├─────────────┤
                  │ _id         │
                  │ name        │
                  │ description │
                  │ price       │
                  │ image[]     │
                  │ category    │
                  │ subCategory │
                  │ sizes[]     │
                  │ bestseller  │
                  └─────────────┘
```

---

## 🔐 Authentication Flow

### User Registration/Login

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /api/user/register
     │    { name, email, password }
     ▼
┌──────────────┐
│   Backend    │
├──────────────┤
│ 2. Validate  │
│ 3. Hash pwd  │
│ 4. Save user │
│ 5. Create JWT│
└────┬─────────┘
     │
     │ 6. Return { success: true, token }
     ▼
┌──────────┐
│  Client  │
├──────────┤
│ 7. Store │
│    token  │
└──────────┘
```

### Protected Routes

```
Request with token
     │
     ▼
┌─────────────────┐
│ authUser()      │
│ Middleware      │
├─────────────────┤
│ 1. Extract token│
│ 2. Verify JWT   │
│ 3. Get userId   │
│ 4. Add to req   │
└────┬────────────┘
     │
     ├── Valid → Continue to controller
     │
     └── Invalid → Return error
```

---

## 🛒 Shopping Cart Flow

```
┌────────────────────────────────────────────┐
│         Frontend (Context API)             │
├────────────────────────────────────────────┤
│                                            │
│  cartItems = {                             │
│    "product_id": {                         │
│      "S": 2,    // 2 items size S         │
│      "M": 1     // 1 item size M          │
│    }                                       │
│  }                                         │
│                                            │
│  addToCart(itemId, size)                  │
│    → Updates cartItems state              │
│    → Shows toast notification             │
│                                            │
│  getCartCount()                            │
│    → Loops through cartItems              │
│    → Returns total quantity               │
│                                            │
│  getCartAmount()                           │
│    → Calculates total price               │
│    → Returns amount                        │
│                                            │
└────────────────────────────────────────────┘
```

---

## 💳 Payment Processing Flow

### Cash on Delivery (COD)

```
Client                Backend               Database
  │                      │                     │
  │ POST /api/order/     │                     │
  │ place (COD)          │                     │
  ├─────────────────────>│                     │
  │                      │ Create order        │
  │                      ├────────────────────>│
  │                      │                     │
  │                      │<────────────────────┤
  │                      │ Clear cart          │
  │                      ├────────────────────>│
  │<─────────────────────┤                     │
  │ { success: true }    │                     │
```

### Stripe/Razorpay

```
Client                Backend              Payment Gateway
  │                      │                       │
  │ POST /api/order/     │                       │
  │ stripe               │                       │
  ├─────────────────────>│                       │
  │                      │ Create session        │
  │                      ├──────────────────────>│
  │                      │<──────────────────────┤
  │                      │ Return checkout URL   │
  │<─────────────────────┤                       │
  │ { session_url }      │                       │
  │                      │                       │
  │ Redirect to payment  │                       │
  ├─────────────────────────────────────────────>│
  │                      │                       │
  │ Complete payment     │                       │
  │<──────────────────────────────────────────────┤
  │                      │                       │
  │ POST /verify         │                       │
  ├─────────────────────>│                       │
  │                      │ Update order          │
  │<─────────────────────┤                       │
```

---

## 📦 Deployment Architecture

```
                    ┌─────────────────┐
                    │   DNS/Domain    │
                    │  www.store.com  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   CDN/Cache     │
                    └────────┬────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
            ▼                                 ▼
    ┌───────────────┐                ┌───────────────┐
    │   Frontend    │                │    Backend    │
    │   (Vercel/    │                │  (Railway/    │
    │   Netlify)    │                │   Heroku)     │
    └───────────────┘                └───────┬───────┘
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                                    ▼                 ▼
                            ┌──────────────┐  ┌──────────────┐
                            │   MongoDB    │  │  Cloudinary  │
                            │    Atlas     │  │   (Images)   │
                            └──────────────┘  └──────────────┘
```

---

## 🔒 Security Layers

```
1. Frontend
   ├── Input validation
   ├── XSS prevention (React escaping)
   └── HTTPS only

2. Backend
   ├── JWT authentication
   ├── Password hashing (bcrypt)
   ├── Request validation
   ├── CORS protection
   └── Rate limiting (recommended)

3. Database
   ├── Connection encryption
   ├── Access control
   └── Regular backups

4. Environment
   ├── Secret keys in .env
   ├── .gitignore protection
   └── Environment separation
```

---

## 📊 Performance Optimization

### Frontend
- Code splitting (React.lazy)
- Image optimization
- Tailwind CSS purging
- Vite build optimization
- Browser caching

### Backend
- Database indexing
- Query optimization
- Response caching
- Connection pooling
- Compression middleware

### Database
- Indexed fields (_id, email)
- Lean queries
- Projection (select specific fields)
- Aggregation pipeline

---

## 🔄 Development Workflow

```
1. Development
   ├── Local MongoDB
   ├── Backend: npm run dev (nodemon)
   ├── Frontend: npm run dev (Vite HMR)
   └── Test in browser

2. Testing
   ├── Unit tests
   ├── Integration tests
   ├── API testing (Postman)
   └── E2E testing

3. Build
   ├── Frontend: npm run build
   ├── Backend: npm start
   └── Database: production config

4. Deployment
   ├── Deploy backend
   ├── Deploy frontend
   ├── Configure DNS
   └── Monitor logs

5. Maintenance
   ├── Monitor errors
   ├── Update dependencies
   ├── Backup database
   └── Scale as needed
```

---

This architecture supports:
- ✅ Scalability (horizontal & vertical)
- ✅ Maintainability (modular code)
- ✅ Security (multiple layers)
- ✅ Performance (optimized)
- ✅ Reliability (error handling)
=======
# System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Pages    │ Components │  Context   │   Assets    │    │
│  │  (Routes)  │   (UI)     │  (State)   │  (Images)   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API Calls
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Routes   │Controllers │ Middleware │   Models    │    │
│  │  (API)     │ (Logic)    │  (Auth)    │ (Schemas)   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
└──────────────┬────────────┬────────────┬───────────────────┘
               │            │            │
               ▼            ▼            ▼
        ┌───────────┐ ┌──────────┐ ┌──────────┐
        │  MongoDB  │ │Cloudinary│ │ Payment  │
        │  Database │ │  Images  │ │ Gateway  │
        └───────────┘ └──────────┘ └──────────┘
```

---

## 🔄 Data Flow

### User Journey: Browse → Add to Cart → Checkout

```
1. USER VISITS WEBSITE
   ↓
2. Frontend loads from /src
   - React components render
   - Context API initializes
   - Products loaded from assets.js
   ↓
3. USER BROWSES PRODUCTS
   - Collection page shows all products
   - Filters applied in frontend
   - No backend call needed (using static data)
   ↓
4. USER ADDS TO CART
   - Context updates cartItems state
   - Cart count updates in navbar
   - Toast notification shown
   ↓
5. USER GOES TO CHECKOUT
   - Cart data from Context
   - User fills delivery form
   - Selects payment method
   ↓
6. USER PLACES ORDER
   - Frontend → POST /api/order/place
   - Backend creates order in MongoDB
   - Cart cleared
   - Success message shown
```

---

## 🗂️ Frontend Architecture

### Component Hierarchy

```
App.jsx (Router)
├── Navbar (always visible)
│   ├── Logo
│   ├── Navigation Links
│   ├── Search Icon
│   ├── Profile Icon
│   ├── Cart Icon (with count)
│   └── Mobile Menu
│
├── SearchBar (conditional)
│
├── Routes (pages)
│   ├── Home
│   │   ├── Hero
│   │   ├── LatestCollection
│   │   ├── BestSeller
│   │   ├── OurPolicy
│   │   └── NewsletterBox
│   │
│   ├── Collection
│   │   ├── Filter Sidebar
│   │   ├── Sort Dropdown
│   │   └── ProductItem (grid)
│   │
│   ├── Product/:productId
│   │   ├── Image Gallery
│   │   ├── Product Info
│   │   ├── Size Selection
│   │   ├── Add to Cart Button
│   │   └── RelatedProducts
│   │
│   ├── Cart
│   │   ├── Cart Items List
│   │   ├── Quantity Controls
│   │   ├── CartTotal
│   │   └── Checkout Button
│   │
│   ├── PlaceOrder
│   │   ├── Delivery Form
│   │   ├── CartTotal
│   │   └── Payment Selection
│   │
│   ├── Orders
│   │   └── Order List
│   │
│   ├── Login
│   │   └── Login/Register Form
│   │
│   ├── About
│   │   └── Company Info
│   │
│   └── Contact
│       └── Contact Form
│
└── Footer (always visible)
```

### State Management (Context API)

```javascript
ShopContext provides:
├── products (array of 52 products)
├── currency ('$')
├── delivery_fee (10)
├── search (string)
├── showSearch (boolean)
├── cartItems (object)
├── setSearch (function)
├── setShowSearch (function)
├── addToCart (function)
├── updateQuantity (function)
├── getCartCount (function)
├── getCartAmount (function)
└── navigate (function)
```

---

## 🔧 Backend Architecture

### API Endpoint Structure

```
/api
├── /user
│   ├── POST /register        → registerUser()
│   ├── POST /login          → loginUser()
│   └── POST /admin          → adminLogin()
│
├── /product
│   ├── GET  /list           → listProducts()
│   ├── POST /single         → singleProduct()
│   ├── POST /add [admin]    → addProduct()
│   └── POST /remove [admin] → removeProduct()
│
├── /cart
│   ├── POST /get [auth]     → getUserCart()
│   ├── POST /add [auth]     → addToCart()
│   └── POST /update [auth]  → updateCart()
│
└── /order
    ├── POST /place [auth]        → placeOrder()
    ├── POST /stripe [auth]       → placeOrderStripe()
    ├── POST /razorpay [auth]     → placeOrderRazorpay()
    ├── POST /userorders [auth]   → userOrders()
    ├── POST /list [admin]        → allOrders()
    ├── POST /status [admin]      → updateStatus()
    ├── POST /verifyStripe [auth] → verifyStripe()
    └── POST /verifyRazorpay [auth] → verifyRazorpay()
```

### Middleware Flow

```
Request → Middleware → Controller → Response

Example: Add to Cart
1. Request: POST /api/cart/add
2. Middleware: authUser (verify JWT token)
3. Controller: addToCart (business logic)
4. Database: Update user's cartData
5. Response: { success: true, message: "Added To Cart" }
```

---

## 💾 Database Schema Relations

```
┌─────────────┐
│    Users    │
├─────────────┤
│ _id         │───┐
│ name        │   │
│ email       │   │
│ password    │   │
│ cartData    │   │
└─────────────┘   │
                  │
                  │ userId (reference)
                  │
                  ├────────────────────┐
                  │                    │
                  ▼                    ▼
         ┌─────────────┐      ┌─────────────┐
         │   Orders    │      │    Cart     │
         ├─────────────┤      │  (embedded) │
         │ _id         │      └─────────────┘
         │ userId      │
         │ items       │───┐
         │ amount      │   │
         │ address     │   │
         │ status      │   │
         │ payment     │   │
         └─────────────┘   │
                           │
                           │ item references
                           │
                           ▼
                  ┌─────────────┐
                  │  Products   │
                  ├─────────────┤
                  │ _id         │
                  │ name        │
                  │ description │
                  │ price       │
                  │ image[]     │
                  │ category    │
                  │ subCategory │
                  │ sizes[]     │
                  │ bestseller  │
                  └─────────────┘
```

---

## 🔐 Authentication Flow

### User Registration/Login

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /api/user/register
     │    { name, email, password }
     ▼
┌──────────────┐
│   Backend    │
├──────────────┤
│ 2. Validate  │
│ 3. Hash pwd  │
│ 4. Save user │
│ 5. Create JWT│
└────┬─────────┘
     │
     │ 6. Return { success: true, token }
     ▼
┌──────────┐
│  Client  │
├──────────┤
│ 7. Store │
│    token  │
└──────────┘
```

### Protected Routes

```
Request with token
     │
     ▼
┌─────────────────┐
│ authUser()      │
│ Middleware      │
├─────────────────┤
│ 1. Extract token│
│ 2. Verify JWT   │
│ 3. Get userId   │
│ 4. Add to req   │
└────┬────────────┘
     │
     ├── Valid → Continue to controller
     │
     └── Invalid → Return error
```

---

## 🛒 Shopping Cart Flow

```
┌────────────────────────────────────────────┐
│         Frontend (Context API)             │
├────────────────────────────────────────────┤
│                                            │
│  cartItems = {                             │
│    "product_id": {                         │
│      "S": 2,    // 2 items size S         │
│      "M": 1     // 1 item size M          │
│    }                                       │
│  }                                         │
│                                            │
│  addToCart(itemId, size)                  │
│    → Updates cartItems state              │
│    → Shows toast notification             │
│                                            │
│  getCartCount()                            │
│    → Loops through cartItems              │
│    → Returns total quantity               │
│                                            │
│  getCartAmount()                           │
│    → Calculates total price               │
│    → Returns amount                        │
│                                            │
└────────────────────────────────────────────┘
```

---

## 💳 Payment Processing Flow

### Cash on Delivery (COD)

```
Client                Backend               Database
  │                      │                     │
  │ POST /api/order/     │                     │
  │ place (COD)          │                     │
  ├─────────────────────>│                     │
  │                      │ Create order        │
  │                      ├────────────────────>│
  │                      │                     │
  │                      │<────────────────────┤
  │                      │ Clear cart          │
  │                      ├────────────────────>│
  │<─────────────────────┤                     │
  │ { success: true }    │                     │
```

### Stripe/Razorpay

```
Client                Backend              Payment Gateway
  │                      │                       │
  │ POST /api/order/     │                       │
  │ stripe               │                       │
  ├─────────────────────>│                       │
  │                      │ Create session        │
  │                      ├──────────────────────>│
  │                      │<──────────────────────┤
  │                      │ Return checkout URL   │
  │<─────────────────────┤                       │
  │ { session_url }      │                       │
  │                      │                       │
  │ Redirect to payment  │                       │
  ├─────────────────────────────────────────────>│
  │                      │                       │
  │ Complete payment     │                       │
  │<──────────────────────────────────────────────┤
  │                      │                       │
  │ POST /verify         │                       │
  ├─────────────────────>│                       │
  │                      │ Update order          │
  │<─────────────────────┤                       │
```

---

## 📦 Deployment Architecture

```
                    ┌─────────────────┐
                    │   DNS/Domain    │
                    │  www.store.com  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   CDN/Cache     │
                    └────────┬────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
            ▼                                 ▼
    ┌───────────────┐                ┌───────────────┐
    │   Frontend    │                │    Backend    │
    │   (Vercel/    │                │  (Railway/    │
    │   Netlify)    │                │   Heroku)     │
    └───────────────┘                └───────┬───────┘
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                                    ▼                 ▼
                            ┌──────────────┐  ┌──────────────┐
                            │   MongoDB    │  │  Cloudinary  │
                            │    Atlas     │  │   (Images)   │
                            └──────────────┘  └──────────────┘
```

---

## 🔒 Security Layers

```
1. Frontend
   ├── Input validation
   ├── XSS prevention (React escaping)
   └── HTTPS only

2. Backend
   ├── JWT authentication
   ├── Password hashing (bcrypt)
   ├── Request validation
   ├── CORS protection
   └── Rate limiting (recommended)

3. Database
   ├── Connection encryption
   ├── Access control
   └── Regular backups

4. Environment
   ├── Secret keys in .env
   ├── .gitignore protection
   └── Environment separation
```

---

## 📊 Performance Optimization

### Frontend
- Code splitting (React.lazy)
- Image optimization
- Tailwind CSS purging
- Vite build optimization
- Browser caching

### Backend
- Database indexing
- Query optimization
- Response caching
- Connection pooling
- Compression middleware

### Database
- Indexed fields (_id, email)
- Lean queries
- Projection (select specific fields)
- Aggregation pipeline

---

## 🔄 Development Workflow

```
1. Development
   ├── Local MongoDB
   ├── Backend: npm run dev (nodemon)
   ├── Frontend: npm run dev (Vite HMR)
   └── Test in browser

2. Testing
   ├── Unit tests
   ├── Integration tests
   ├── API testing (Postman)
   └── E2E testing

3. Build
   ├── Frontend: npm run build
   ├── Backend: npm start
   └── Database: production config

4. Deployment
   ├── Deploy backend
   ├── Deploy frontend
   ├── Configure DNS
   └── Monitor logs

5. Maintenance
   ├── Monitor errors
   ├── Update dependencies
   ├── Backup database
   └── Scale as needed
```

---

This architecture supports:
- ✅ Scalability (horizontal & vertical)
- ✅ Maintainability (modular code)
- ✅ Security (multiple layers)
- ✅ Performance (optimized)
- ✅ Reliability (error handling)
>>>>>>> 5ef376294affdb62fdf048f37ebddacd953addb9
