// components/products/SortDropdown.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'featured', label: '✨ Featured' },
    { value: 'newest', label: '🆕 Newest First' },
    { value: 'price-low', label: '💰 Price: Low to High' },
    { value: 'price-high', label: '💰 Price: High to Low' },
    { value: 'rating', label: '⭐ Top Rated' },
  ];

  return (
    <div className="relative flex-1 sm:flex-none">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full sm:w-48 appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium text-gray-700 cursor-pointer"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;