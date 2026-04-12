// components/products/EndMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const EndMessage = ({ totalProducts }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mt-12 py-6"
    >
      <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        You've reached the end! {totalProducts} products loaded
      </p>
    </motion.div>
  );
};

export default EndMessage;