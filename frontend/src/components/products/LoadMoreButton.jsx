// components/products/LoadMoreButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadMoreButton = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mt-12"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Show More Products
          <svg 
            className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.button>
    </motion.div>
  );
};

export default LoadMoreButton;