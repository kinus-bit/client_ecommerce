// components/checkout/ShippingStep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';

const ShippingStep = ({ 
  formData, 
  errors, 
  shippingMethod, 
  onInputChange, 
  onShippingMethodChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-400" />
        Shipping Address
      </h2>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            placeholder="Street address"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={onInputChange}
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              placeholder="City"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onInputChange}
              placeholder="State"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>
        
        <div>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onInputChange}
            placeholder="ZIP code"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-400" />
          Shipping Method
        </h3>
        <div className="space-y-2">
          <label
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              shippingMethod === 'standard'
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="standard"
              checked={shippingMethod === 'standard'}
              onChange={onShippingMethodChange}
              className="mr-3 text-amber-500 focus:ring-amber-500"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Standard Shipping</p>
              <p className="text-sm text-gray-600">5-7 business days</p>
            </div>
            <span className="font-medium text-gray-900">$5.00</span>
          </label>
          
          <label
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              shippingMethod === 'express'
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={shippingMethod === 'express'}
              onChange={onShippingMethodChange}
              className="mr-3 text-amber-500 focus:ring-amber-500"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Express Shipping</p>
              <p className="text-sm text-gray-600">2-3 business days</p>
            </div>
            <span className="font-medium text-gray-900">$15.00</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingStep;