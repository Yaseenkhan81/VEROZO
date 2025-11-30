<<<<<<< HEAD
# Forever E-commerce - Full Stack Application

A complete e-commerce platform built with React, Node.js, Express, and MongoDB.

## Project Structure

```
forever-ecommerce/
├── src/                    # Frontend React application
│   ├── assets/            # Images and static assets
│   ├── components/        # React components
│   ├── context/           # React Context for state management
│   └── pages/             # Page components
├── backend/               # Backend Node.js/Express application
│   ├── config/           # Database and service configurations
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication and file upload middleware
│   ├── models/           # MongoDB schemas
│   └── routes/           # API routes
└── public/               # Static files
```

## Features

### Frontend Features
- 🏠 Home page with hero section, latest collections, and bestsellers
- 🛍️ Product collection page with filters (category, subcategory) and sorting
- 🔍 Search functionality
- 📦 Product detail page with image gallery and size selection
- 🛒 Shopping cart with quantity management
- 💳 Checkout process with multiple payment options
- 👤 User authentication (login/register)
- 📋 Order history and tracking
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

### Backend Features
- 🔐 JWT-based authentication
- 👥 User management (register, login)
- 📦 Product CRUD operations
- 🛒 Cart management
- 💰 Order processing
- 💳 Payment gateway integration (Stripe, Razorpay, COD)
- 🖼️ Image upload with Cloudinary
- 👨‍💼 Admin panel capabilities
- 🔒 Protected routes with middleware

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Toastify** - Notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Stripe & Razorpay** - Payment processing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd forever-ecommerce
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4. Configure Environment Variables

Create/Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce
PORT=4000
JWT_SECRET=your_secure_jwt_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateway Keys (optional for testing)
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### 5. Start MongoDB
```bash
# Windows (if installed as service)
# MongoDB starts automatically

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 6. Start the Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173` (or 5174 if 5173 is in use)

## Usage

### Frontend Application

1. **Browse Products**: Visit the home page to see latest arrivals and bestsellers
2. **Filter Products**: Go to Collection page and filter by category, subcategory, or search
3. **View Product Details**: Click on any product to see details and select size
4. **Add to Cart**: Select size and add products to your cart
5. **Checkout**: Proceed to checkout, fill delivery information, and select payment method
6. **Track Orders**: View your order history in the Orders page

### Admin Features (Backend)

Use the admin credentials to access admin features:
- Add new products with images
- Remove products
- View all orders
- Update order status

### API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all products
curl http://localhost:4000/api/product/list

# Register a user
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: Boolean,
  date: Number
}
```

### Orders Collection
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  paymentMethod: String,
  payment: Boolean,
  date: Number
}
```

## Building for Production

### Frontend
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Backend
```bash
cd backend
npm start
```

## Deployment Options

### Frontend
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Host as a static website

### Backend
- **Heroku**: Use Heroku CLI to deploy
- **Railway**: Connect GitHub and deploy
- **DigitalOcean**: Deploy on a Droplet
- **AWS EC2**: Set up Node.js server

### Database
- **MongoDB Atlas**: Free cloud-hosted MongoDB
- **DigitalOcean Managed MongoDB**
- **AWS DocumentDB**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the connection string in `.env`

**Port Already in Use:**
- Change the PORT in `backend/.env`
- Or kill the process using the port

**Cloudinary Upload Fails:**
- Verify your Cloudinary credentials
- Check image file size limits

**CORS Errors:**
- Ensure backend CORS is configured properly
- Check if frontend URL is allowed

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: admin@forever.com

## Acknowledgments

- Product images from various sources
- Icons from Tailwind CSS
- Community contributions
=======
# Forever E-commerce - Full Stack Application

A complete e-commerce platform built with React, Node.js, Express, and MongoDB.

## Project Structure

```
forever-ecommerce/
├── src/                    # Frontend React application
│   ├── assets/            # Images and static assets
│   ├── components/        # React components
│   ├── context/           # React Context for state management
│   └── pages/             # Page components
├── backend/               # Backend Node.js/Express application
│   ├── config/           # Database and service configurations
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication and file upload middleware
│   ├── models/           # MongoDB schemas
│   └── routes/           # API routes
└── public/               # Static files
```

## Features

### Frontend Features
- 🏠 Home page with hero section, latest collections, and bestsellers
- 🛍️ Product collection page with filters (category, subcategory) and sorting
- 🔍 Search functionality
- 📦 Product detail page with image gallery and size selection
- 🛒 Shopping cart with quantity management
- 💳 Checkout process with multiple payment options
- 👤 User authentication (login/register)
- 📋 Order history and tracking
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

### Backend Features
- 🔐 JWT-based authentication
- 👥 User management (register, login)
- 📦 Product CRUD operations
- 🛒 Cart management
- 💰 Order processing
- 💳 Payment gateway integration (Stripe, Razorpay, COD)
- 🖼️ Image upload with Cloudinary
- 👨‍💼 Admin panel capabilities
- 🔒 Protected routes with middleware

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Toastify** - Notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Stripe & Razorpay** - Payment processing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd forever-ecommerce
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4. Configure Environment Variables

Create/Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce
PORT=4000
JWT_SECRET=your_secure_jwt_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateway Keys (optional for testing)
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### 5. Start MongoDB
```bash
# Windows (if installed as service)
# MongoDB starts automatically

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 6. Start the Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173` (or 5174 if 5173 is in use)

## Usage

### Frontend Application

1. **Browse Products**: Visit the home page to see latest arrivals and bestsellers
2. **Filter Products**: Go to Collection page and filter by category, subcategory, or search
3. **View Product Details**: Click on any product to see details and select size
4. **Add to Cart**: Select size and add products to your cart
5. **Checkout**: Proceed to checkout, fill delivery information, and select payment method
6. **Track Orders**: View your order history in the Orders page

### Admin Features (Backend)

Use the admin credentials to access admin features:
- Add new products with images
- Remove products
- View all orders
- Update order status

### API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all products
curl http://localhost:4000/api/product/list

# Register a user
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: Boolean,
  date: Number
}
```

### Orders Collection
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  paymentMethod: String,
  payment: Boolean,
  date: Number
}
```

## Building for Production

### Frontend
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Backend
```bash
cd backend
npm start
```

## Deployment Options

### Frontend
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Host as a static website

### Backend
- **Heroku**: Use Heroku CLI to deploy
- **Railway**: Connect GitHub and deploy
- **DigitalOcean**: Deploy on a Droplet
- **AWS EC2**: Set up Node.js server

### Database
- **MongoDB Atlas**: Free cloud-hosted MongoDB
- **DigitalOcean Managed MongoDB**
- **AWS DocumentDB**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the connection string in `.env`

**Port Already in Use:**
- Change the PORT in `backend/.env`
- Or kill the process using the port

**Cloudinary Upload Fails:**
- Verify your Cloudinary credentials
- Check image file size limits

**CORS Errors:**
- Ensure backend CORS is configured properly
- Check if frontend URL is allowed

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: admin@forever.com

## Acknowledgments

- Product images from various sources
- Icons from Tailwind CSS
- Community contributions
>>>>>>> 5ef376294affdb62fdf048f37ebddacd953addb9
