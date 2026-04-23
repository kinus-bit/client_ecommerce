// components/checkout/CheckoutForm.jsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import InformationStep from './InformationStep';

const CheckoutForm = ({ 
  formData, 
  errors, 
  isProcessing,
  apiError,
  onInputChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6">
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {apiError}
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <InformationStep 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
        />
      </AnimatePresence>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isProcessing}
          className={`px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">⏳</span>
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;