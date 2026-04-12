// components/checkout/OrderSummary.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

const OrderSummary = ({ cartItems, subtotal, shippingCost, tax, total, shippingMethod }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h2>
      
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
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
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">
            Est. delivery: {shippingMethod === 'standard' ? 'Dec 15-20' : 'Dec 10-12'}
          </span>
        </div>
      </div>

      {/* Accepted Payments */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Accepted payment methods:</p>
        <div className="flex gap-2">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Visa</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Mastercard</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Amex</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">PayPal</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;