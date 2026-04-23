// components/checkout/CheckoutProgress.jsx
import React from 'react';
import { User, Check } from 'lucide-react';

const CheckoutProgress = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-900 text-white flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">
            Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;