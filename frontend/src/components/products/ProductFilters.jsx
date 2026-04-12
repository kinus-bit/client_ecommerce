// components/products/ProductFilters.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

const sidebarColorClasses = {
  cyan: 'bg-cyan-50 text-cyan-700 font-medium',
  rose: 'bg-rose-50 text-rose-700 font-medium',
  amber: 'bg-amber-50 text-amber-700 font-medium',
  emerald: 'bg-emerald-50 text-emerald-700 font-medium',
  yellow: 'bg-yellow-50 text-yellow-700 font-medium',
  violet: 'bg-violet-50 text-violet-700 font-medium',
  pink: 'bg-pink-50 text-pink-700 font-medium',
  teal: 'bg-teal-50 text-teal-700 font-medium',
  orange: 'bg-orange-50 text-orange-700 font-medium',
};

const ProductFilters = ({ 
  categories, 
  selectedCategory, 
  selectedSubCategory, 
  searchTerm,
  onCategorySelect, 
  onSubCategorySelect, 
  onClearAll 
}) => {
  return (
    <div className="bg-white hidden md:block lg:block rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-500" />
          Filters
        </h2>
        {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchTerm) && (
          <button
            onClick={onClearAll}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategorySelect('all')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => onCategorySelect(key)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                selectedCategory === key
                  ? sidebarColorClasses[category.color]
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      {selectedCategory !== 'all' && categories[selectedCategory]?.subCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h3 className="font-medium text-gray-900 mb-3">Sub Categories</h3>
          <div className="space-y-1">
            <button
              onClick={() => onSubCategorySelect(selectedCategory, 'all')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                selectedSubCategory === 'all'
                  ? 'bg-gray-900 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All {categories[selectedCategory]?.name}
            </button>
            {categories[selectedCategory]?.subCategories.map(sub => (
              <button
                key={sub}
                onClick={() => onSubCategorySelect(selectedCategory, sub)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                  selectedSubCategory === sub
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Search Term Display */}
      {searchTerm && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            Searching for: "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;