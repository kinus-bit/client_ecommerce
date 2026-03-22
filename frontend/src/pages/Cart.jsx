// pages/Cart.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Truck, Shield, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const shippingCost = cartItems.length > 0 ? 5 : 0;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;


  const getItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length === 0 
              ? 'Your cart is feeling lonely' 
              : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything yet. Let's change that!
              </p>
              <Link to="/products">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              {/* Popular categories */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Popular categories:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/products?category=electronics" className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                    Electronics
                  </Link>
                  <Link to="/products?category=fashion" className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                    Fashion
                  </Link>
                  <Link to="/products?category=home" className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                    Home & Living
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-6"
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Product Image */}
                          <div className="sm:w-24 sm:h-24 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  ${item.price} each
                                </p>
                                {item.discount > 0 && (
                                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    {item.discount}% off
                                  </span>
                                )}
                              </div>
                              
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${getItemTotal(item)}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mt-6"
              >
                <span>←</span>
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shippingCost > 0 && subtotal < 50 && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button and to="/checkout" to be implemented later*/}
                <Link to="/nextstage">
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="space-y-2 text-xs text-gray-600">
                  {/* <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>Secure checkout powered by mpesa</span>
                  </div> */}
                  {/* <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-gray-400" />
                    <span>Free gift wrapping available</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>30-day easy returns</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3">We accept:</p>
                  <div className="flex gap-2">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">PayPal</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">Mpesa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;