// components/dashboard/DashboardStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Heart, Calendar } from 'lucide-react';

const DashboardStats = ({ orders, cartItems, wishlistItems, joinDate }) => {
  const stats = [
    { 
      label: 'Total Orders', 
      value: orders.length, 
      icon: ShoppingBag, 
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    { 
      label: 'Items in Cart', 
      value: cartItems.length, 
      icon: Package, 
      color: 'bg-amber-500',
      change: cartItems.length > 0 ? 'Ready to checkout' : 'Cart is empty'
    },
    { 
      label: 'Member Since', 
      value: joinDate, 
      icon: Calendar, 
      color: 'bg-green-500',
      change: 'Active member'
    }
  ];
  console.log("joining date", joinDate)

  console.log("testing cart items" ,cartItems)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;