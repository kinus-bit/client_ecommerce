// components/product/ShippingTab.jsx
import React from 'react';
import { Truck, Zap, Package } from 'lucide-react';

const ShippingTab = ({ product, calculateDeliveryDate }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Standard Shipping</p>
            <p className="text-sm text-gray-600">Free • Estimated delivery: {product.deliveryEstimate || calculateDeliveryDate()}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Express Shipping</p>
            <p className="text-sm text-gray-600">$9.99 • Estimated delivery: 2-3 business days</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Package className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">International Shipping</p>
            <p className="text-sm text-gray-600">Available for select countries • Rates calculated at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingTab;