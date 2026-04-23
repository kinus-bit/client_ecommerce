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
import { createorder, getmycart } from '@/services/api';
import { useEffect } from 'react';

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [ cartItems , setCartItems] = useState([]);
  const [ products , setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    address: '',
    contact: '',
  });

  const fetchCartItems = async() => {
      try {
        const res = await getmycart();
        console.log(res.items);
        setCartItems(res); 
        setProducts(res.items);
      } catch (error) {
        console.log("Backend error:", error.response?.data || error.message);  
      }
  }

  useEffect( () => {
    fetchCartItems();
  }, []);

  const shippingCost = 5; // Default standard shipping
  
  const subtotal = cartItems.totalPrice;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.address) {
      newErrors.address = 'Shipping address is required';
    }
    
    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (formData.contact.length < 10) {
      newErrors.contact = 'Contact number must be at least 10 digits';
    } else if (!/^[0-9]+$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must contain only numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    setApiError('');
    
    try {
      // Prepare order data for backend
      const shippingAddress = formData.address;
      const contact = formData.contact;
      
      const orderPayload = {
        shippingAddress,
        contact,
      };
      
      console.log('Sending order payload:', orderPayload);
      
      // Call backend API to create order
      const response = await createorder(orderPayload);
      console.log('Order creation response:', response);
      
      // Store order data
      setOrderData(response.order || response.data);
      
      
      // Show order complete screen
      setOrderComplete(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/dashboard?tab=orders');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to create order. Please try again.';
      setApiError(errorMessage);
      setIsProcessing(false);
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (orderComplete) {
    return <OrderComplete orderData={orderData} />;
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
        <CheckoutProgress />

        {/* API Error Display */}
        {apiError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm 
              formData={formData}
              errors={errors}
              isProcessing={isProcessing}
              apiError={apiError}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
            <SecurityBadge />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={products}
              subtotal={subtotal}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;