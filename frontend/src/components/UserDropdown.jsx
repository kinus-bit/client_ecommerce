// components/UserDropdown.jsx (Updated with dark mode)
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronDown, Shield } from 'lucide-react';
import {getUserFromToken} from '../utils/auth';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = getUserFromToken();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage
    navigate('/');
    setIsOpen(false);
  };

  const handleNavigation = (tab) => {
    navigate(`/dashboard?tab=${tab}`);
    setIsOpen(false);
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    return 'U';
  };

  const menuItems = [
    { icon: ShoppingBag, label: 'Browse Products', tab: 'products' },
    { icon: User, label: 'My Profile', tab: 'profile' },
    { icon: ShoppingBag, label: 'My Orders', tab: 'orders' },
    { icon: Heart, label: 'Wishlist', tab: 'overview' },
    { icon: Settings, label: 'Settings', tab: 'profile' },
    { icon: Shield, label: 'Change Password', tab: 'password' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
          hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials()
          )}
        </div>
        <span className="text-sm font-medium hidden lg:inline text-gray-700">
          {user?.firstName || 'User'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}
          text-gray-500`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg border overflow-hidden z-50 'bg-white border-gray-200"
          >
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs truncate text-gray-500">
                {user?.email}
              </p>
            </div>

            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.tab)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                        text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-200"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;