// components/product/RelatedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((relatedProduct) => (
          <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{relatedProduct.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-amber-600 font-bold">Ksh{relatedProduct.price}</p>
                {relatedProduct.originalPrice && (
                  <p className="text-xs text-gray-400 line-through">Ksh{relatedProduct.originalPrice}</p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;