// components/Navbar.jsx (Updated with theme toggle)
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/95 backdrop-blur-md shadow-sm'
          : isDarkMode 
            ? 'bg-gray-900' 
            : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                ShopEase
              </motion.div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-800'
              }`}>
                since 2026
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActivePath(link.path)
                      ? isDarkMode
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-900 text-white'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}
              
              {/* Cart */}
              <Link to="/dashboard?tab=cart" className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className={isDarkMode ? 'text-gray-300 border-gray-700 hover:bg-gray-800' : 'text-gray-700'}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className={isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}>
                      Get started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* <ThemeToggle /> */}
              
              <Link to="/dashboard?tab=cart" className="relative p-2">
                <ShoppingCart className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {isOpen ? (
                  <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                ) : (
                  <Menu className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
              className={`fixed top-0 left-0 w-64 h-full shadow-xl z-50 md:hidden ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                  </button>
                </div>
                
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        isActivePath(link.path)
                          ? isDarkMode
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-900 text-white'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t my-6 pt-6 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login" className="block w-full mb-2">
                        <Button className="w-full justify-center">Login</Button>
                      </Link>
                      <Link to="/signup" className="block w-full">
                        <Button variant="outline" className="w-full justify-center">Sign Up</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className={`block px-4 py-2 rounded-lg ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                      }`}>
                        My Account
                      </Link>
                      <Link to="/dashboard?tab=orders" className={`block px-4 py-2 rounded-lg ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                      }`}>
                        My Orders
                      </Link>
                    </>
                  )}
                </div>

                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Free shipping on orders over $50
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    30-day returns, no questions asked
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;