// pages/Checkout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, MapPin, User, Check, Lock, Shield, ArrowLeft, Package, Calendar, Smartphone } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    M_pesaNumber:'',
    MpesaName:'',
    // cardNumber: '',
    // cardName: '',
    // expiry: '',
    // cvv: '',
    saveInfo: false
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [errors, setErrors] = useState({});

  const shippingCost = shippingMethod === 'standard' ? 5 : 15;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }
    
    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 3) {
      if (!formData.M_pesaNumber) newErrors.M_pesaNumber = 'M-pesa  number is required';
      else if (formData.M_pesaNumber.length < 10) {
        newErrors.M_pesaNumber = 'M-pesa number must be 10 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Process payment
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 2000);
    }
  };

  
  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center py-12"
      >
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. We'll send you a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Order #: SHOP-{Math.floor(Math.random() * 10000)}</p>
              <p>You'll receive shipping updates via email.</p>
            </div>
            <Link to="/">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Cart</span>
            </Link>
            <span className="text-sm text-gray-500">Secure checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { number: 1, label: 'Information', icon: User },
              { number: 2, label: 'Shipping', icon: MapPin },
              { number: 3, label: 'Payment', icon: CreditCard },
            ].map((s) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
              {/* Step 1: Information */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      Contact Information
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          id="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        />
                        {/* -----------------------------TO BE IMPLEMENTED LATTER---------------------------------------------- */}
                        {/* <label htmlFor="saveInfo" className="text-sm text-gray-600">
                          Keep me updated on new products and offers
                        </label> 
                      </div> */}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Shipping */}
                {step === 2 && (
                  <motion.div
                    key="step2"
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
                          onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                            onChange={(e) => setShippingMethod(e.target.value)}
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
                            onChange={(e) => setShippingMethod(e.target.value)}
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
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
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
                          type="Number"
                          name="M_pesaNumber"
                          value={formData.M_pesaNumber}
                          onChange={handleInputChange}
                          placeholder="0768332588"
                          maxLength="10"
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
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Jose Murinyo"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
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
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
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

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your information is protected by 256-bit SSL encryption</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;