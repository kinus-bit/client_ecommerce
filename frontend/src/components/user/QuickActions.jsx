// components/dashboard/QuickActions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';

const QuickActions = ({ cartItemsCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/dashboard?tab=products">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
          <ShoppingBag className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg mb-1">Continue Shopping</h3>
          <p className="text-amber-100 text-sm">Discover new products and deals</p>
        </div>
      </Link>
      <Link to="/dashboard?tab=cart">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
          <Package className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg mb-1">View Cart</h3>
          <p className="text-gray-300 text-sm">
            {cartItemsCount} item(s) ready for checkout
          </p>
        </div>
      </Link>
    </div>
  );
};

export default QuickActions;