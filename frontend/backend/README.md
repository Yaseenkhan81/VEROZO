# Forever E-commerce Backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Edit the `.env` file with your credentials:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token generation
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: Admin login credentials
- `CLOUDINARY_*`: Cloudinary credentials for image uploads
- `STRIPE_SECRET_KEY`: Stripe payment gateway key
- `RAZORPAY_*`: Razorpay payment gateway credentials

### 3. Install and Start MongoDB
Make sure MongoDB is installed and running on your machine:
```bash
# For Windows (if installed via installer)
# MongoDB should start automatically as a service

# For macOS (using Homebrew)
brew services start mongodb-community

# For Linux
sudo systemctl start mongod
```

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

## API Endpoints

### User Routes (`/api/user`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /admin` - Admin login

### Product Routes (`/api/product`)
- `GET /list` - Get all products
- `POST /single` - Get single product
- `POST /add` - Add product (Admin only)
- `POST /remove` - Remove product (Admin only)

### Cart Routes (`/api/cart`)
- `POST /get` - Get user cart
- `POST /add` - Add to cart
- `POST /update` - Update cart

### Order Routes (`/api/order`)
- `POST /place` - Place order (COD)
- `POST /stripe` - Place order (Stripe)
- `POST /razorpay` - Place order (Razorpay)
- `POST /userorders` - Get user orders
- `POST /list` - Get all orders (Admin only)
- `POST /status` - Update order status (Admin only)
- `POST /verifyStripe` - Verify Stripe payment
- `POST /verifyRazorpay` - Verify Razorpay payment

## Database Models

### User Model
- name
- email
- password (hashed)
- cartData

### Product Model
- name
- description
- price
- image (array)
- category
- subCategory
- sizes (array)
- bestseller
- date

### Order Model
- userId
- items (array)
- amount
- address
- status
- paymentMethod
- payment (boolean)
- date
