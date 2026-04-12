// components/products/EmptyState.jsx
import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ searchTerm, onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-xl text-gray-900 mb-2">No products found</p>
      <p className="text-gray-600 mb-6">
        {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
      >
        Clear Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;