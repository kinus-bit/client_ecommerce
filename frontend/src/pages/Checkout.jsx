// pages/Checkout.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  CheckoutHeader,
  CheckoutProgress,
  CheckoutForm,
  OrderSummary,
  OrderComplete,
  SecurityBadge
} from '../components/checkout';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    M_pesaNumber: '',
    MpesaName: '',
  });

  const shippingCost = shippingMethod === 'standard' ? 5 : 15;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
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
      if (!formData.M_pesaNumber) newErrors.M_pesaNumber = 'M-pesa number is required';
      else if (formData.M_pesaNumber.length < 10) {
        newErrors.M_pesaNumber = 'M-pesa number must be 10 digits';
      }
      if (!formData.MpesaName) newErrors.MpesaName = 'M-pesa name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    if (step < 3) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
        
        setTimeout(() => {
          navigate('/dashboard?tab=overview');
        }, 3000);
      }, 2000);
    }
  };

  if (orderComplete) {
    return <OrderComplete />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <CheckoutHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutProgress step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm 
              step={step}
              formData={formData}
              errors={errors}
              shippingMethod={shippingMethod}
              isProcessing={isProcessing}
              onInputChange={handleInputChange}
              onShippingMethodChange={handleShippingMethodChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
            <SecurityBadge />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              total={total}
              shippingMethod={shippingMethod}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;