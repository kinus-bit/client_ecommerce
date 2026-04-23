// components/checkout/OrderComplete.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const OrderComplete = ({ orderData }) => {
  const orderNumber = orderData?.order?._id 
    ? orderData.order._id.slice(-8).toUpperCase() 
    : `SHOP-${Math.floor(Math.random() * 10000)}`;
  
  const totalAmount = orderData?.order?.totalPrice || orderData?.totalPrice;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12"
    >
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-sm"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. We'll send you a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">Order #: {orderNumber}</p>
            {totalAmount && (
              <p className="text-sm mb-1">Total Amount: ${totalAmount.toFixed(2)}</p>
            )}
            <p>You'll receive shipping updates via email.</p>
          </div>
          <Link to="/dashboard?tab=overview">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderComplete;