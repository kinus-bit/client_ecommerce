// components/products/ActiveFilters.jsx
import React from 'react';
import { X } from 'lucide-react';

const ActiveFilters = ({ 
  searchTerm, 
  selectedCategory, 
  selectedSubCategory, 
  categories,
  onRemoveSearch,
  onRemoveCategory,
  onRemoveSubCategory
}) => {
  if (selectedCategory === 'all' && selectedSubCategory === 'all' && !searchTerm) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {searchTerm && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
          🔍 "{searchTerm}"
          <button onClick={onRemoveSearch} className="ml-1 hover:text-amber-900">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {selectedCategory !== 'all' && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {categories[selectedCategory]?.icon} {categories[selectedCategory]?.name}
          <button onClick={onRemoveCategory} className="ml-1 hover:text-gray-900">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {selectedSubCategory !== 'all' && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {selectedSubCategory}
          <button onClick={onRemoveSubCategory} className="ml-1 hover:text-gray-900">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
    </div>
  );
};

export default ActiveFilters;