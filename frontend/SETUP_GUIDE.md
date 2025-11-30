<<<<<<< HEAD
# Complete Setup Guide - Forever E-commerce

This guide will walk you through setting up the entire application from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Testing the Application](#testing-the-application)
6. [Optional: Payment Gateway Setup](#optional-payment-gateway-setup)
7. [Optional: Cloudinary Setup](#optional-cloudinary-setup)

---

## Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (v6 or higher)
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

3. **Git**
   - Download from: https://git-scm.com/downloads

### Optional Services (for full features)
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)
- Razorpay account (for payment processing)

---

## MongoDB Setup

### Windows
1. Install MongoDB using the installer
2. MongoDB service starts automatically
3. Verify: Open Command Prompt and type `mongosh`

### macOS
```bash
# Install
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

### Linux
```bash
# Install (Ubuntu/Debian)
sudo apt-get install mongodb

# Start
sudo systemctl start mongod

# Enable auto-start
sudo systemctl enable mongod

# Verify
mongosh
```

### Verify MongoDB is Running
```bash
mongosh
# You should see a connection message
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
- validator
- multer
- cloudinary
- stripe
- razorpay
- nodemon (dev dependency)

### Step 3: Configure Environment Variables

The `.env` file is already created. Update these values:

```env
# Database (keep as-is for local development)
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce

# Server Port
PORT=4000

# Security - CHANGE THESE!
JWT_SECRET=replace_with_random_string_at_least_32_chars_long
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Image Upload (optional - can skip for now)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateways (optional - can skip for now)
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Important:** Generate a secure JWT_SECRET:
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Step 4: Seed Database (Optional)
```bash
npm run seed
```

This adds sample products to your database.

### Step 5: Start Backend Server
```bash
npm run dev
```

You should see:
```
Server started on PORT : 4000
DB Connected
```

---

## Frontend Setup

### Step 1: Open New Terminal & Navigate to Root Directory
```bash
cd ..  # Go back to project root
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- react-toastify
- tailwindcss
- vite
- and more...

### Step 3: Start Frontend Development Server
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## Testing the Application

### 1. Open Your Browser
Navigate to: `http://localhost:5173` (or the port shown in your terminal)

### 2. Test Frontend Features

**Home Page:**
- Should see hero section
- Latest collections (10 products)
- Best sellers (5 bestseller products)
- Policy icons
- Newsletter signup
- Footer

**Navigation:**
- Click "COLLECTION" to see all products
- Use filters (Men/Women/Kids, Topwear/Bottomwear/Winterwear)
- Try search functionality
- Sort products by price

**Product Page:**
- Click any product
- View image gallery
- Select size
- Add to cart (should show toast notification)
- See cart count update in navbar

**Cart:**
- Click cart icon
- View cart items
- Update quantities
- Remove items
- See total calculation
- Proceed to checkout

**Checkout:**
- Fill delivery information
- Select payment method (COD for testing)
- Place order
- View orders page

### 3. Test Backend APIs

**Using Browser or Postman:**

Get all products:
```
GET http://localhost:4000/api/product/list
```

Register a user:
```
POST http://localhost:4000/api/user/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

Login:
```
POST http://localhost:4000/api/user/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Optional: Payment Gateway Setup

### Stripe Setup

1. Create account at https://stripe.com
2. Get your test API keys from Dashboard
3. Add to `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```

### Razorpay Setup

1. Create account at https://razorpay.com
2. Get your test API keys
3. Add to `backend/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```

---

## Optional: Cloudinary Setup

For product image uploads in admin panel:

1. Create account at https://cloudinary.com
2. Get credentials from Dashboard
3. Add to `backend/.env`:
   ```env
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret_key
   ```

---

## Troubleshooting

### Backend won't start
**Error: `connect ECONNREFUSED 127.0.0.1:27017`**
- Solution: Start MongoDB (see MongoDB Setup section)

**Error: `Error: listen EADDRINUSE: address already in use :::4000`**
- Solution: Change PORT in backend/.env or kill process using port 4000

### Frontend won't start
**Error: Port 5173 is in use**
- Vite will automatically try port 5174, 5175, etc.

### Products not showing
- Check if backend is running
- Check browser console for errors
- Verify MongoDB has data (run seed script)

### MongoDB connection issues
**Windows:**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start if not running
Start-Service MongoDB
```

**macOS/Linux:**
```bash
# Check status
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

---

## Next Steps

### For Development:
1. Customize the frontend design
2. Add more products via admin panel
3. Implement additional features
4. Test payment gateways

### For Production:
1. Change all .env secrets
2. Set up MongoDB Atlas
3. Deploy backend to Heroku/Railway
4. Deploy frontend to Vercel/Netlify
5. Configure Cloudinary for images
6. Set up real payment gateway credentials

---

## Quick Command Reference

```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Start Backend
cd backend && npm run dev

# Start Frontend (new terminal)
npm run dev

# Seed Database
cd backend && npm run seed

# Build for Production
npm run build
```

---

## Support

If you encounter any issues:
1. Check this guide's troubleshooting section
2. Check backend terminal for errors
3. Check browser console for errors
4. Ensure all services are running (MongoDB, Backend, Frontend)

Happy coding! 🚀
=======
# Complete Setup Guide - Forever E-commerce

This guide will walk you through setting up the entire application from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Testing the Application](#testing-the-application)
6. [Optional: Payment Gateway Setup](#optional-payment-gateway-setup)
7. [Optional: Cloudinary Setup](#optional-cloudinary-setup)

---

## Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (v6 or higher)
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

3. **Git**
   - Download from: https://git-scm.com/downloads

### Optional Services (for full features)
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)
- Razorpay account (for payment processing)

---

## MongoDB Setup

### Windows
1. Install MongoDB using the installer
2. MongoDB service starts automatically
3. Verify: Open Command Prompt and type `mongosh`

### macOS
```bash
# Install
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

### Linux
```bash
# Install (Ubuntu/Debian)
sudo apt-get install mongodb

# Start
sudo systemctl start mongod

# Enable auto-start
sudo systemctl enable mongod

# Verify
mongosh
```

### Verify MongoDB is Running
```bash
mongosh
# You should see a connection message
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
- validator
- multer
- cloudinary
- stripe
- razorpay
- nodemon (dev dependency)

### Step 3: Configure Environment Variables

The `.env` file is already created. Update these values:

```env
# Database (keep as-is for local development)
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce

# Server Port
PORT=4000

# Security - CHANGE THESE!
JWT_SECRET=replace_with_random_string_at_least_32_chars_long
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Image Upload (optional - can skip for now)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateways (optional - can skip for now)
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Important:** Generate a secure JWT_SECRET:
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Step 4: Seed Database (Optional)
```bash
npm run seed
```

This adds sample products to your database.

### Step 5: Start Backend Server
```bash
npm run dev
```

You should see:
```
Server started on PORT : 4000
DB Connected
```

---

## Frontend Setup

### Step 1: Open New Terminal & Navigate to Root Directory
```bash
cd ..  # Go back to project root
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- react-toastify
- tailwindcss
- vite
- and more...

### Step 3: Start Frontend Development Server
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## Testing the Application

### 1. Open Your Browser
Navigate to: `http://localhost:5173` (or the port shown in your terminal)

### 2. Test Frontend Features

**Home Page:**
- Should see hero section
- Latest collections (10 products)
- Best sellers (5 bestseller products)
- Policy icons
- Newsletter signup
- Footer

**Navigation:**
- Click "COLLECTION" to see all products
- Use filters (Men/Women/Kids, Topwear/Bottomwear/Winterwear)
- Try search functionality
- Sort products by price

**Product Page:**
- Click any product
- View image gallery
- Select size
- Add to cart (should show toast notification)
- See cart count update in navbar

**Cart:**
- Click cart icon
- View cart items
- Update quantities
- Remove items
- See total calculation
- Proceed to checkout

**Checkout:**
- Fill delivery information
- Select payment method (COD for testing)
- Place order
- View orders page

### 3. Test Backend APIs

**Using Browser or Postman:**

Get all products:
```
GET http://localhost:4000/api/product/list
```

Register a user:
```
POST http://localhost:4000/api/user/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

Login:
```
POST http://localhost:4000/api/user/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Optional: Payment Gateway Setup

### Stripe Setup

1. Create account at https://stripe.com
2. Get your test API keys from Dashboard
3. Add to `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```

### Razorpay Setup

1. Create account at https://razorpay.com
2. Get your test API keys
3. Add to `backend/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```

---

## Optional: Cloudinary Setup

For product image uploads in admin panel:

1. Create account at https://cloudinary.com
2. Get credentials from Dashboard
3. Add to `backend/.env`:
   ```env
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret_key
   ```

---

## Troubleshooting

### Backend won't start
**Error: `connect ECONNREFUSED 127.0.0.1:27017`**
- Solution: Start MongoDB (see MongoDB Setup section)

**Error: `Error: listen EADDRINUSE: address already in use :::4000`**
- Solution: Change PORT in backend/.env or kill process using port 4000

### Frontend won't start
**Error: Port 5173 is in use**
- Vite will automatically try port 5174, 5175, etc.

### Products not showing
- Check if backend is running
- Check browser console for errors
- Verify MongoDB has data (run seed script)

### MongoDB connection issues
**Windows:**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start if not running
Start-Service MongoDB
```

**macOS/Linux:**
```bash
# Check status
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

---

## Next Steps

### For Development:
1. Customize the frontend design
2. Add more products via admin panel
3. Implement additional features
4. Test payment gateways

### For Production:
1. Change all .env secrets
2. Set up MongoDB Atlas
3. Deploy backend to Heroku/Railway
4. Deploy frontend to Vercel/Netlify
5. Configure Cloudinary for images
6. Set up real payment gateway credentials

---

## Quick Command Reference

```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Start Backend
cd backend && npm run dev

# Start Frontend (new terminal)
npm run dev

# Seed Database
cd backend && npm run seed

# Build for Production
npm run build
```

---

## Support

If you encounter any issues:
1. Check this guide's troubleshooting section
2. Check backend terminal for errors
3. Check browser console for errors
4. Ensure all services are running (MongoDB, Backend, Frontend)

Happy coding! 🚀
>>>>>>> 5ef376294affdb62fdf048f37ebddacd953addb9
