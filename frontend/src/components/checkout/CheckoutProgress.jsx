// components/checkout/CheckoutProgress.jsx
import React from 'react';
import { User, MapPin, CreditCard, Check } from 'lucide-react';

const CheckoutProgress = ({ step }) => {
  const steps = [
    { number: 1, label: 'Information', icon: User },
    { number: 2, label: 'Shipping', icon: MapPin },
    { number: 3, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = step >= s.number;
          const isCompleted = step > s.number;
          
          return (
            <div key={s.number} className="flex-1 text-center relative">
              <div className="relative">
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                {s.number < 3 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 transition-all ${
                      step > s.number ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${
                isActive ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgress;