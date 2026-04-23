// components/checkout/InformationStep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone } from 'lucide-react';

const InformationStep = ({ formData, errors, onInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-gray-400" />
        Shipping Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              placeholder="Enter your shipping address"
              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={onInputChange}
              placeholder="0712345678"
              className={`w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Enter your M-pesa number so we can reach out to you
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InformationStep;