// components/checkout/CheckoutForm.jsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import InformationStep from './InformationStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';

const CheckoutForm = ({ 
  step, 
  formData, 
  errors, 
  shippingMethod, 
  isProcessing,
  onInputChange, 
  onShippingMethodChange,
  onBack,
  onSubmit 
}) => {
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <InformationStep 
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
          />
        );
      case 2:
        return (
          <ShippingStep 
            formData={formData}
            errors={errors}
            shippingMethod={shippingMethod}
            onInputChange={onInputChange}
            onShippingMethodChange={onShippingMethodChange}
          />
        );
      case 3:
        return (
          <PaymentStep 
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={isProcessing}
          className={`ml-auto px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">⏳</span>
              Processing...
            </>
          ) : step === 3 ? (
            'Place Order'
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;