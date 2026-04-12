// components/product/ProductActions.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Check } from 'lucide-react';

const ProductActions = ({ 
  product, 
  isAdded, 
  isInWishlistState, 
  onAddToCart, 
  onWishlist 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onAddToCart}
        disabled={!product.inStock}
        className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
          !product.inStock 
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : isAdded
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onWishlist}
        className={`px-6 py-3 border rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
          isInWishlistState
            ? 'border-red-200 bg-red-50 text-red-600'
            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
        }`}
      >
        <Heart className={`w-5 h-5 ${isInWishlistState ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isInWishlistState ? 'Saved' : 'Save'}</span>
      </motion.button>    
    </div>
  );
};

export default ProductActions;