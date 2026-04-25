// components/admin/AdminSidebar.jsx (Add notifications to menu)
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Tags,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Menu
} from 'lucide-react';
import { getNotifications } from '@/services/api';

const AdminSidebar = ({ isCollapsed, toggleSidebar }) => {
  const [unreadCount, setUnreadCount] = useState(''); 
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
   
  
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      console.log("Backend notification response:", res.pagination);
      setUnreadCount(res.pagination);
    } catch (error) {
      console.log("Backend response error:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log("Unread notifications:", unreadCount.unreadCount);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileOpen && isMobile) {
        const sidebar = document.getElementById('mobile-sidebar');
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (sidebar && !sidebar.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
          setIsMobileOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen, isMobile]);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/products', label: 'Products', icon: Package },
    { path: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/dashboard/users', label: 'Users', icon: Users },
    { path: '/dashboard/categories', label: 'Categories', icon: Tags },
    { path: '/dashboard/subcategories', label: 'Subcategories', icon: Tags },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: unreadCount.unreadCount },
  ];

  // Mobile menu button
  const MobileMenuButton = () => (
    <button
      id="mobile-menu-btn"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all"
    >
      <Menu className="w-5 h-5 text-gray-600" />
    </button>
  );

  // Mobile overlay
  const MobileOverlay = () => (
    isMobileOpen && isMobile && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsMobileOpen(false)}
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
      />
    )
  );

  // Sidebar content component (reused for both desktop and mobile)
  const SidebarContent = ({ isMobileView = false, onItemClick = () => {} }) => (
    <>
      {/* Logo */}
      <div className={`h-16 flex items-center ${isCollapsed && !isMobileView ? 'justify-center' : 'px-4 sm:px-6'} border-b border-gray-200 flex-shrink-0`}>
        {!isCollapsed || isMobileView ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {(!isCollapsed || isMobileView) && (
              <span className="font-bold text-base sm:text-lg text-gray-900">AdminPanel</span>
            )}
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 sm:py-6 overflow-y-auto">
        <div className="space-y-1 px-2 sm:px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (isMobileView) onItemClick();
                }}
                className={({ isActive }) => `
                  flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-xl transition-all duration-200
                  ${isCollapsed && !isMobileView ? 'justify-center' : ''}
                  ${isActive 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                {(!isCollapsed || isMobileView) && (
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                )}
                {(!isCollapsed || isMobileView) && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-2 sm:p-3 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={() => {
           
            if (isMobileView) onItemClick();
          }}
          className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-xl transition-all duration-200 ${
            isCollapsed && !isMobileView ? 'justify-center' : ''
          } text-gray-600 hover:bg-gray-100 hover:text-gray-900`}
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          {(!isCollapsed || isMobileView) && <span className="text-xs sm:text-sm font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <MobileMenuButton />
      <MobileOverlay />

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="hidden md:block h-screen fixed left-0 top-0 z-30 bg-white flex flex-col shadow-lg border-r border-gray-200 transition-all duration-300"
      >
        <SidebarContent />
        
        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 p-1 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-all"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" /> : <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar (Slide-in) */}
      <motion.aside
        id="mobile-sidebar"
        initial={{ x: '-100%' }}
        animate={{ x: isMobileOpen && isMobile ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="md:hidden fixed left-0 top-0 z-50 w-72 h-screen bg-white flex flex-col shadow-xl border-r border-gray-200"
      >
        <SidebarContent isMobileView={true} onItemClick={() => setIsMobileOpen(false)} />
      </motion.aside>
    </>
  );
};

export default AdminSidebar;