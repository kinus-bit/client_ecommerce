// components/Navbar.jsx (Updated with theme toggle and role-based display)
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart,UserCircleIcon, Menu, X, UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { getUserRole, getUserFromToken, isAdmin, isBuyer, getUsername } from '../utils/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  // Get user info from token
  const userRole = getUserRole();
  const user = getUserFromToken();
  const username = getUsername();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Role-based navigation links
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];

    // Add role-specific links
    if (user && isAdmin()) {
      return [
        { name: 'Admin Dashboard', path: '/admin' },
        { name: 'Manage Products', path: '/admin/products' },
        { name: 'Manage Orders', path: '/admin/orders' },
      ];
    } else if (user && isBuyer()) {
      return [
        { name: 'My Dashboard', path: '/dashboard' },
        { name: 'My Orders', path: '/dashboard?tab=orders' },
      ];
    }
    
    return commonLinks;
  };

  const navLinks = getNavLinks();

  // Get role badge styling
  const getRoleBadgeStyle = () => {
    if (userRole === 'admin') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    } else if (userRole === 'user') {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                ShopEase
              </motion.div>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                since 2026
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              { !user && navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-2">
              
              {/* Cart - Only show for logged in users or guests */}
              {user && <Link to="/dashboard?tab=cart" className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
              </Link>}

              {/* Role Badge - Only show when authenticated */}
              {user&& userRole && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle()}`}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
              )}

              {/* Auth Section */}
              {user ? (
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarImage src={user.profilePicture} alt="user" />
                        <AvatarFallback>
                          <UserIcon/>
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <UserIcon />
                      <Link to="/dashboard?tab=profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                      <LogOutIcon />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="text-gray-700 dark:text-gray-300">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600">
                      Get started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              
              {user && <Link to="/dashboard?tab=cart" className="relative p-2">
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>}
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isOpen  ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
              className="fixed top-0 left-0 w-64 h-full shadow-xl z-50 md:hidden bg-white dark:bg-gray-900"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-gray-900 dark:text-white">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Role Badge for Mobile */}
                {user && userRole && (
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle()}`}>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                    {username && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        @{username}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="space-y-1">
                  {!user && navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2 rounded-lg transition-colors bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t my-6 pt-6 border-gray-200 dark:border-gray-700">
                  {!user && !userRole ? (
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
                      {isAdmin() && (
                        <>
                          <Link to="/admin" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            Admin Dashboard
                          </Link>
                          <Link to="/admin/products" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            Manage Products
                          </Link>
                          <Link to="/admin/orders" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            Manage Orders
                          </Link>
                        </>
                      )}
                      {isBuyer() && (
                        <>
                          <Link to="/dashboard" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            My Dashboard
                          </Link>
                          <Link to="/dashboard?tab=orders" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                            My Orders
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 mt-4"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>

                <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="text-xs mb-2 text-gray-600 dark:text-gray-400">
                    Free shipping on orders over $50
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
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