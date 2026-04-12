// components/dashboard/OrdersList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import OrderCard from './OrderCard';

const OrdersList = ({ orders, getStatusColor }) => {
  if (orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No orders yet</p>
        <Link to="/dashboard?tab=products">
          <button className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
      ))}
    </div>
  );
};

export default OrdersList;