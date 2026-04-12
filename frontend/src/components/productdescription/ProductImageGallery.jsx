// components/product/ProductImageGallery.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';

const ProductImageGallery = ({ 
  product, 
  selectedImage, 
  onImageSelect, 
  onImageZoom,
  onVideoClick 
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4"
      >
        <div 
          className="relative bg-white rounded-2xl overflow-hidden shadow-sm cursor-zoom-in"
          onClick={() => onImageZoom(selectedImage)}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Save ${product.originalPrice - product.price}
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              New Arrival
            </div>
          )}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onImageSelect(index)}
            className={`relative rounded-xl overflow-hidden bg-white shadow-sm ${
              selectedImage === index ? 'ring-2 ring-amber-500' : ''
            }`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </motion.button>
        ))}
      </div>

      {product.video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <button 
            onClick={onVideoClick}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
          >
            <Video className="w-5 h-5" />
            <span className="text-sm font-medium">Watch Product Video</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProductImageGallery;