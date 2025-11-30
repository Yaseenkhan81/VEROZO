import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from '../models/productModel.js';

dotenv.config();

// Sample product data (using local images from frontend)
const sampleProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: ["https://via.placeholder.com/400x500?text=Product+1"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    image: ["https://via.placeholder.com/400x500?text=Product+2"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: Date.now(),
    bestseller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    image: ["https://via.placeholder.com/400x500?text=Product+3"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: Date.now(),
    bestseller: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await productModel.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await productModel.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
