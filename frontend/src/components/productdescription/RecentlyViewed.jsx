// components/product/RecentlyViewed.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecentlyViewed = ({ products }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
              <p className="text-amber-600 font-bold">Ksh{item.price}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentlyViewed;