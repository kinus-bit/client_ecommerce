// components/products/ProductCard.jsx (add action buttons)
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, view = 'grid', index, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const isWishlisted = isInWishlist?.(product.id) || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all"
    >
      <Link to={`/producttest/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                NEW
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-rose-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Price */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
            Ksh{product.price}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {product.subCategory}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToWishlist?.(product);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.(product);
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-amber-500 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;