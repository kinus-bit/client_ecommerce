// components/products/ViewToggle.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all ${
          view === 'grid' 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Grid className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all ${
          view === 'list' 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <List className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default ViewToggle;