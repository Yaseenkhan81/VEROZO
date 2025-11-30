<<<<<<< HEAD
# Quick Reference Guide

## 🚀 Start/Stop Commands

### Start Everything (3 Terminals)

**Terminal 1 - MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - MongoDB runs as service automatically
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
npm run dev
```

### Stop Everything

**Stop Frontend/Backend:**
- Press `Ctrl + C` in respective terminals

**Stop MongoDB:**
```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod

# Windows
Stop-Service MongoDB
```

---

## 🔑 Default Credentials

### Admin Login
```
Email: admin@forever.com
Password: admin123
```

### Test User (create via Register page)
```
Name: Test User
Email: test@example.com
Password: password123
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| MongoDB | mongodb://localhost:27017 |

---

## 📡 API Quick Tests

### Using curl:

**Get All Products:**
```bash
curl http://localhost:4000/api/product/list
```

**Register User:**
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

## 📂 Important File Locations

### Configuration Files
```
backend/.env              # Backend environment variables
package.json              # Frontend dependencies
backend/package.json      # Backend dependencies
tailwind.config.js        # Tailwind configuration
vite.config.js           # Vite configuration
```

### Key Code Files
```
src/context/ShopContext.jsx        # Global state management
src/App.jsx                        # Main app & routing
backend/server.js                  # Backend entry point
backend/config/mongodb.js          # Database connection
```

---

## 🛠️ Common Tasks

### Add New Product (via code)
Edit `src/assets/assets.js` and add to products array:
```javascript
{
  _id: "unique_id",
  name: "Product Name",
  description: "Description",
  price: 100,
  image: [p_img1],
  category: "Men",
  subCategory: "Topwear",
  sizes: ["S", "M", "L"],
  date: Date.now(),
  bestseller: false
}
```

### Reset Cart
Clear browser localStorage or delete cart data from user document in MongoDB.

### Clear Database
```bash
mongosh
use forever-ecommerce
db.products.deleteMany({})
db.users.deleteMany({})
db.orders.deleteMany({})
```

### Rebuild Frontend
```bash
npm run build
```

---

## 🐛 Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Find process on port 4000 (backend)
# macOS/Linux
lsof -i :4000
kill -9 <PID>

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### MongoDB Not Connecting
```bash
# Check if MongoDB is running
# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Start if stopped
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Clear Node Modules & Reinstall
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Browser Cache Issues
- Open DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"

---

## 📦 Package Management

### Add New Frontend Package
```bash
npm install package-name
```

### Add New Backend Package
```bash
cd backend
npm install package-name
```

### Update All Packages
```bash
npm update
```

---

## 🔍 Debugging Tips

### Check Backend Logs
Look at the terminal running `npm run dev` in backend folder

### Check Frontend Console
Open browser DevTools (F12) → Console tab

### Check Database
```bash
mongosh
use forever-ecommerce
db.products.find().pretty()
db.users.find().pretty()
db.orders.find().pretty()
```

### Test API Endpoint
Use Postman or curl to test specific endpoints

---

## 📝 Environment Variables Reference

### Backend .env
```env
# Required
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce
PORT=4000
JWT_SECRET=your_secure_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Optional (for full features)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## 🎨 Tailwind CSS Classes Reference

### Common Classes Used
```css
/* Layout */
flex, grid, container, mx-auto

/* Spacing */
p-4, m-4, px-6, py-3, gap-4

/* Sizing */
w-full, h-screen, max-w-6xl

/* Typography */
text-sm, text-xl, font-medium, font-bold

/* Colors */
bg-gray-50, text-gray-700, border-gray-300

/* Responsive */
sm:, md:, lg:, xl:
```

---

## 🔗 Useful Links

### Documentation
- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

### Services
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Cloudinary: https://cloudinary.com
- Stripe: https://stripe.com
- Razorpay: https://razorpay.com

### Deployment
- Vercel (Frontend): https://vercel.com
- Netlify (Frontend): https://netlify.com
- Heroku (Backend): https://heroku.com
- Railway (Backend): https://railway.app

---

## 📊 Project Metrics

### Build Sizes (Approximate)
```
Frontend (dev): ~2-3 MB
Frontend (build): ~200-300 KB (gzipped)
Backend: ~50 MB (with node_modules)
Database: Minimal (depends on products)
```

### Performance Targets
```
First Contentful Paint: < 1.5s
Time to Interactive: < 3s
Lighthouse Score: > 90
```

---

## 🎯 Testing Checklist

### Frontend
- [ ] Home page loads
- [ ] Navigation works
- [ ] Product filtering works
- [ ] Search works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Checkout flow works
- [ ] Login/Register works
- [ ] Mobile responsive

### Backend
- [ ] Server starts without errors
- [ ] Database connects
- [ ] GET /api/product/list returns products
- [ ] User registration works
- [ ] User login returns token
- [ ] Protected routes require auth
- [ ] Cart operations work
- [ ] Order placement works

---

## 💾 Backup & Restore

### Backup MongoDB
```bash
mongodump --db forever-ecommerce --out ./backup
```

### Restore MongoDB
```bash
mongorestore --db forever-ecommerce ./backup/forever-ecommerce
```

### Backup Code
```bash
git add .
git commit -m "Backup: $(date)"
git push
```

---

## 🚀 Deployment Checklist

- [ ] Update .env with production values
- [ ] Change JWT_SECRET to secure value
- [ ] Set up MongoDB Atlas
- [ ] Configure Cloudinary
- [ ] Set up payment gateways
- [ ] Build frontend (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Update API URLs in frontend
- [ ] Test deployed application
- [ ] Set up monitoring
- [ ] Configure SSL/HTTPS
- [ ] Set up domain name

---

## 📞 Getting Help

1. Check SETUP_GUIDE.md for detailed instructions
2. Check troubleshooting section above
3. Review backend terminal for error messages
4. Check browser console for frontend errors
5. Verify all services are running

---

**Last Updated:** 2024
**Version:** 1.0.0
=======
# Quick Reference Guide

## 🚀 Start/Stop Commands

### Start Everything (3 Terminals)

**Terminal 1 - MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - MongoDB runs as service automatically
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
npm run dev
```

### Stop Everything

**Stop Frontend/Backend:**
- Press `Ctrl + C` in respective terminals

**Stop MongoDB:**
```bash
# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod

# Windows
Stop-Service MongoDB
```

---

## 🔑 Default Credentials

### Admin Login
```
Email: admin@forever.com
Password: admin123
```

### Test User (create via Register page)
```
Name: Test User
Email: test@example.com
Password: password123
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| MongoDB | mongodb://localhost:27017 |

---

## 📡 API Quick Tests

### Using curl:

**Get All Products:**
```bash
curl http://localhost:4000/api/product/list
```

**Register User:**
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

## 📂 Important File Locations

### Configuration Files
```
backend/.env              # Backend environment variables
package.json              # Frontend dependencies
backend/package.json      # Backend dependencies
tailwind.config.js        # Tailwind configuration
vite.config.js           # Vite configuration
```

### Key Code Files
```
src/context/ShopContext.jsx        # Global state management
src/App.jsx                        # Main app & routing
backend/server.js                  # Backend entry point
backend/config/mongodb.js          # Database connection
```

---

## 🛠️ Common Tasks

### Add New Product (via code)
Edit `src/assets/assets.js` and add to products array:
```javascript
{
  _id: "unique_id",
  name: "Product Name",
  description: "Description",
  price: 100,
  image: [p_img1],
  category: "Men",
  subCategory: "Topwear",
  sizes: ["S", "M", "L"],
  date: Date.now(),
  bestseller: false
}
```

### Reset Cart
Clear browser localStorage or delete cart data from user document in MongoDB.

### Clear Database
```bash
mongosh
use forever-ecommerce
db.products.deleteMany({})
db.users.deleteMany({})
db.orders.deleteMany({})
```

### Rebuild Frontend
```bash
npm run build
```

---

## 🐛 Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Find process on port 4000 (backend)
# macOS/Linux
lsof -i :4000
kill -9 <PID>

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### MongoDB Not Connecting
```bash
# Check if MongoDB is running
# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Start if stopped
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Clear Node Modules & Reinstall
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Browser Cache Issues
- Open DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"

---

## 📦 Package Management

### Add New Frontend Package
```bash
npm install package-name
```

### Add New Backend Package
```bash
cd backend
npm install package-name
```

### Update All Packages
```bash
npm update
```

---

## 🔍 Debugging Tips

### Check Backend Logs
Look at the terminal running `npm run dev` in backend folder

### Check Frontend Console
Open browser DevTools (F12) → Console tab

### Check Database
```bash
mongosh
use forever-ecommerce
db.products.find().pretty()
db.users.find().pretty()
db.orders.find().pretty()
```

### Test API Endpoint
Use Postman or curl to test specific endpoints

---

## 📝 Environment Variables Reference

### Backend .env
```env
# Required
MONGODB_URI=mongodb://localhost:27017/forever-ecommerce
PORT=4000
JWT_SECRET=your_secure_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123

# Optional (for full features)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## 🎨 Tailwind CSS Classes Reference

### Common Classes Used
```css
/* Layout */
flex, grid, container, mx-auto

/* Spacing */
p-4, m-4, px-6, py-3, gap-4

/* Sizing */
w-full, h-screen, max-w-6xl

/* Typography */
text-sm, text-xl, font-medium, font-bold

/* Colors */
bg-gray-50, text-gray-700, border-gray-300

/* Responsive */
sm:, md:, lg:, xl:
```

---

## 🔗 Useful Links

### Documentation
- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

### Services
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Cloudinary: https://cloudinary.com
- Stripe: https://stripe.com
- Razorpay: https://razorpay.com

### Deployment
- Vercel (Frontend): https://vercel.com
- Netlify (Frontend): https://netlify.com
- Heroku (Backend): https://heroku.com
- Railway (Backend): https://railway.app

---

## 📊 Project Metrics

### Build Sizes (Approximate)
```
Frontend (dev): ~2-3 MB
Frontend (build): ~200-300 KB (gzipped)
Backend: ~50 MB (with node_modules)
Database: Minimal (depends on products)
```

### Performance Targets
```
First Contentful Paint: < 1.5s
Time to Interactive: < 3s
Lighthouse Score: > 90
```

---

## 🎯 Testing Checklist

### Frontend
- [ ] Home page loads
- [ ] Navigation works
- [ ] Product filtering works
- [ ] Search works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Checkout flow works
- [ ] Login/Register works
- [ ] Mobile responsive

### Backend
- [ ] Server starts without errors
- [ ] Database connects
- [ ] GET /api/product/list returns products
- [ ] User registration works
- [ ] User login returns token
- [ ] Protected routes require auth
- [ ] Cart operations work
- [ ] Order placement works

---

## 💾 Backup & Restore

### Backup MongoDB
```bash
mongodump --db forever-ecommerce --out ./backup
```

### Restore MongoDB
```bash
mongorestore --db forever-ecommerce ./backup/forever-ecommerce
```

### Backup Code
```bash
git add .
git commit -m "Backup: $(date)"
git push
```

---

## 🚀 Deployment Checklist

- [ ] Update .env with production values
- [ ] Change JWT_SECRET to secure value
- [ ] Set up MongoDB Atlas
- [ ] Configure Cloudinary
- [ ] Set up payment gateways
- [ ] Build frontend (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Update API URLs in frontend
- [ ] Test deployed application
- [ ] Set up monitoring
- [ ] Configure SSL/HTTPS
- [ ] Set up domain name

---

## 📞 Getting Help

1. Check SETUP_GUIDE.md for detailed instructions
2. Check troubleshooting section above
3. Review backend terminal for error messages
4. Check browser console for frontend errors
5. Verify all services are running

---

**Last Updated:** 2024
**Version:** 1.0.0
>>>>>>> 5ef376294affdb62fdf048f37ebddacd953addb9
