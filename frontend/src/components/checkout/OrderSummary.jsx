// components/checkout/OrderSummary.jsx
import React from 'react';

const OrderSummary = ({ cartItems, subtotal}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h2>
      
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item._id} className="flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.product.images} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal}</span>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-xl text-gray-900">${subtotal}</span>
          </div>
        </div>
      </div>

      {/* Accepted Payments */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Accepted payment method:</p>
        <div className="flex gap-2">
          <span className="text-xs bg-green-200 px-2 py-1 rounded">mpesa</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;