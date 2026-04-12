// components/product/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ product }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-amber-600 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-amber-600 transition-colors">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;