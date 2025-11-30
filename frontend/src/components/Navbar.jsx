import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "../assets/logo_name.png";
import searchIcon from "../assets/search_icon.png";
import profile_icon from "../assets/profile_icon.png";
import menu_icon from "../assets/menu_icon.png";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setShowSearch, getCartCount, isAuthenticated, user, logout, setShowLoginPopup } = useContext(ShopContext);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="flex items-center justify-between py-4 px-6 font-medium bg-gray-50 shadow-sm relative">

      {/* Left: Logo (prevent shrinking) */}
      <Link to="/" className="flex items-center gap-3 flex-shrink-0">
        <img src={logoUrl} alt="Verozo logo" className="h-12 w-auto object-contain" />
        <span className="verozo-brand text-2xl sm:text-3xl font-bold text-gray-800 hidden sm:block">VEROZO</span>
      </Link>

      {/* Desktop Nav (hidden on small screens) */}
      <ul className="hidden sm:flex gap-10 text-gray-700">
        <li>
          <NavLink to="/" end className="hover:text-black cursor-pointer">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" className="hover:text-black cursor-pointer">
            COLLECTION
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-black cursor-pointer">
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="hover:text-black cursor-pointer">
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Right: Search + Profile + Cart — VISIBLE on both mobile & desktop */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          onClick={() => setShowSearch(true)}
          className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={searchIcon} alt="Search" className="w-5 h-5" />
        </button>

        {/* Profile Avatar with Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
          >
            <img src={profile_icon} alt="User" className="w-full h-full object-cover" />
          </button>
          
          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowLoginPopup(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </button>
                  <Link
                    to="/orders"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Track Order (Guest)
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative cursor-pointer group">
          <img src={assets.cart_icon} alt="Cart" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center cart-badge hover:bg-red-600 transition-colors">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="block sm:hidden ml-2 cursor-pointer"
          onClick={() => setVisible(true)}
          aria-label="Open menu"
        >
          <img src={menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop when drawer is open */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
          onClick={() => setVisible(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer / Side Menu */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-white shadow-lg z-50
          transition-all duration-300 overflow-hidden
          ${visible ? "w-64" : "w-0"}
        `}
        aria-hidden={!visible}
      >

        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">

          {/* BACK button */}
          <button
            onClick={() => setVisible(false)}
            className="text-xl cursor-pointer"
            aria-label="Back menu"
          >
            ← Back
          </button>

          {/* CLOSE button */}
          <button
            onClick={() => setVisible(false)}
            className="text-2xl cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        {visible && (
          <nav className="px-6 mt-4">
            <ul className="flex flex-col gap-6 text-gray-700">

              <li className="cursor-pointer">
                <NavLink to="/" onClick={() => setVisible(false)} className="block">
                  HOME
                </NavLink>
              </li>

              <li className="cursor-pointer">
                <NavLink to="/collection" onClick={() => setVisible(false)} className="block">
                  COLLECTION
                </NavLink>
              </li>

              <li className="cursor-pointer">
                <NavLink to="/about" onClick={() => setVisible(false)} className="block">
                  ABOUT
                </NavLink>
              </li>

              <li className="cursor-pointer">
                <NavLink to="/contact" onClick={() => setVisible(false)} className="block">
                  CONTACT
                </NavLink>
              </li>

            </ul>
          
          </nav>

        )}
        
      </aside>
    </div>
  );
}
