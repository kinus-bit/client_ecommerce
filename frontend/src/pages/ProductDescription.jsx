// pages/ProductDescription.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDescription = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const product = {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'Experience the power of the iPhone 15 Pro with its advanced camera system, A17 Pro chip, and stunning design.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&angle=90',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&angle=180',
    ],
    rating: 4.8,
    reviews: 245,
    inStock: true,
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    specifications: {
      'Processor': 'A17 Pro',
      'Display': '6.1" Super Retina XDR',
      'Camera': '48MP Main | 12MP Ultra Wide',
      'Battery': 'Up to 23 hours video playback'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-purple-600 mb-6">${product.price}</p>
            
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Colors</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border rounded-lg hover:border-purple-600 transition-colors"
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart({ ...product, quantity })}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm">30 Days Return</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b pb-2">
                <span className="font-semibold w-32">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDescription;