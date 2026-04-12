// components/products/SearchBar.jsx
import React from 'react';
import { X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearch, onClear }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full md:w-80 px-4 py-3 pl-10 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
      />
      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;