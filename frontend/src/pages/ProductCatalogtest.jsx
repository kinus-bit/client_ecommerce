// pages/ProductCatalog.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/products/SearchBar';
import CategoryPills from '../components/products/CategoryPills';
import SortDropdown from '../components/products/SortDropdown';
import ViewToggle from '../components/products/ViewToggle';
import ProductGrid from '../components/products/ProductGrid';
import ActiveFilters from '../components/products/ActiveFilters';
import EmptyState from '../components/products/EmptyState';
import LoadMoreButton from '../components/products/LoadMoreButton';
import EndMessage from '../components/products/EndMessage';
import { products, categories } from '@/data/Product';

const ProductCatalogtest = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  const filterProducts = () => {
    let filtered = products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) return false;
      if (searchTerm) {
        const matchesSearch = 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.subCategory.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const sortedProducts = filterProducts();
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < sortedProducts.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setVisibleCount(5);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setVisibleCount(5);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('all');
    setVisibleCount(5);
  };

  const handleSubCategorySelect = (category, subCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setVisibleCount(5);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSearchTerm('');
    setVisibleCount(5);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Hero Header - Simplified for dashboard */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-600 text-sm">
              Discover amazing products tailored just for you
            </p>
          </div>
          
          <SearchBar 
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onClear={clearSearch}
          />
        </div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <CategoryPills 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      {/* Products Section - No sidebar filters */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{visibleProducts.length}</span> of <span className="font-medium text-gray-900">{sortedProducts.length}</span> {sortedProducts.length === 1 ? 'product' : 'products'}
          </p>
          
          <ActiveFilters 
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            categories={categories}
            onRemoveSearch={clearSearch}
            onRemoveCategory={() => handleCategorySelect('all')}
            onRemoveSubCategory={() => handleSubCategorySelect(selectedCategory, 'all')}
          />
        </div>

        {sortedProducts.length === 0 ? (
          <EmptyState searchTerm={searchTerm} onClearFilters={clearAllFilters} />
        ) : (
          <>
            <ProductGrid products={visibleProducts} view={view} />
            
            {hasMoreProducts && <LoadMoreButton onClick={loadMore} />}
            
            {!hasMoreProducts && sortedProducts.length > 0 && (
              <EndMessage totalProducts={sortedProducts.length} />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCatalogtest;