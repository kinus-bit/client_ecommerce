// components/products/ProductList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductList = ({ products, onAddToCart, onAddToWishlist, isInWishlist }) => {
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all"
        >
          <Link to={`/product/${product.id}`} className="flex flex-col sm:flex-row">
            {/* Product Image */}
            <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                    NEW
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 hover:text-amber-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{product.brand || 'Generic'}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="text-xs text-green-600">Save {product.discount}%</span>
                  )}
                </div>
              </div>
              
              {/* Rating */}
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
                <span className="text-xs text-gray-500">
                  ({product.reviews} reviews)
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 capitalize">{product.subCategory}</span>
              </div>
              
              {/* Stock Status */}
              <div className="mt-3">
                {product.inStock ? (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                    In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.(product);
                  }}
                  disabled={!product.inStock}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    !product.inStock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToWishlist?.(product);
                  }}
                  className={`p-2 rounded-lg border transition-all ${
                    isInWishlist?.(product.id)
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist?.(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;