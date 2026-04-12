// components/checkout/CheckoutHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CheckoutHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/dashboard?tab=cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Cart</span>
          </Link>
          <span className="text-sm text-gray-500">Secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;