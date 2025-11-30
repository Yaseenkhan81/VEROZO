// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import About from './pages/About';
import Collection from './pages/Collection';
import Footer from './components/Footer';
import EnhancedSearchBar from './components/EnhancedSearchBar';
import LoginPopup from './components/LoginPopup';
import { ShopContext } from './context/ShopContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  const { showLoginPopup, setShowLoginPopup, login } = useContext(ShopContext);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <EnhancedSearchBar />
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)} 
        onLogin={login}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}
