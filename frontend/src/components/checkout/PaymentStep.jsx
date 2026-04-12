// components/checkout/PaymentStep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';

const PaymentStep = ({ formData, errors, onInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-gray-400" />
        Payment Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            M-pesa number
          </label>
          <input
            type="tel"
            name="M_pesaNumber"
            value={formData.M_pesaNumber}
            onChange={onInputChange}
            placeholder="0768332588"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.M_pesaNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.M_pesaNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.M_pesaNumber}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            M-pesa name
          </label>
          <input
            type="text"
            name="MpesaName"
            value={formData.MpesaName}
            onChange={onInputChange}
            placeholder="Jose Murinyo"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.MpesaName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.MpesaName && (
            <p className="text-red-500 text-xs mt-1">{errors.MpesaName}</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStep;