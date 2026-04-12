// components/product/ProductInfo.jsx
import React from 'react';
import { Star, Check, Gift, Truck, Shield, RefreshCw, Package, Clock } from 'lucide-react';

const ProductInfo = ({ product, selectedColor, onColorSelect, calculateDeliveryDate }) => {
  return (
    <div>
      {/* Title & Rating */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.brand}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'fill-gray-300 text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.inStock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">Free shipping included</p>
        
        {product.price < product.originalPrice && (
          <div className="mt-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
            <Gift className="w-4 h-4" />
            <span>Special offer! {product.discount}% off regular price</span>
          </div>
        )}
      </div>

      {/* Features */}
      {product.features && (
        <div className="flex gap-4 mb-6">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              {feature.icon}
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Highlights */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Key highlights</h3>
        <ul className="space-y-2">
          {product.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed border-t border-b border-gray-200 py-4">
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Color</h3>
            <span className="text-sm text-amber-600">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedColor === color
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm mb-6">
        <div className="text-center">
          <Truck className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-900">Free Shipping</p>
          <p className="text-xs text-gray-500">On orders $50+</p>
        </div>
        <div className="text-center">
          <Shield className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-900">{product.warranty || '2 Year'} Warranty</p>
          <p className="text-xs text-gray-500">Full coverage</p>
        </div>
        <div className="text-center">
          <RefreshCw className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-900">30 Days Return</p>
          <p className="text-xs text-gray-500">No questions asked</p>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3 text-sm">
          <Package className="w-5 h-5 text-amber-500" />
          <div>
            <p className="font-medium text-gray-900">Free delivery</p>
            <p className="text-gray-600">{product.deliveryEstimate || calculateDeliveryDate()} if you order in the next 4 hours</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm mt-3">
          <Clock className="w-5 h-5 text-amber-500" />
          <div>
            <p className="font-medium text-gray-900">Pickup available</p>
            <p className="text-gray-600">at {product.pickupLocation || 'San Francisco store'} - Ready today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;