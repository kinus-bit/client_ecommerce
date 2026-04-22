// pages/ProductCatalogtest.jsx
import React, { useState, useEffect } from 'react';
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
import { getAllProducts, getallcategories, getallsubcategories } from '@/services/api';

// Helper function to transform categories for the component
const transformCategories = (categories, subcategories) => {
  const transformed = {};
  
  categories.forEach(category => {
    // Find subcategories that belong to this category
    const categorySubs = subcategories
      .filter(sub => sub.category && sub.category._id === category._id)
      .map(sub => sub.name);
    
    transformed[category.name] = {
      name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
      icon: getCategoryIcon(category.name),
      color: getCategoryColor(category.name),
      subCategories: categorySubs
    };
  });
  
  return transformed;
};

// Icon mapping for categories
const getCategoryIcon = (categoryName) => {
  const icons = {
    'menfashion': '👔',
    'womenfashion': '👗',
    'furniture': '🪑',
    'drinks': '🍺',
    'Electronics': '📱',
    'curtains': '🪟',
    'carpets': '🧵',
    'Home Decor': '🏠',
    'Cutlery': '🍴'
  };
  return icons[categoryName] || '📦';
};

// Color mapping for categories (maintained for any styling needs)
const getCategoryColor = (categoryName) => {
  const colors = {
    'menfashion': 'bg-blue-500 text-white',
    'womenfashion': 'bg-pink-500 text-white',
    'furniture': 'bg-amber-600 text-white',
    'drinks': 'bg-emerald-600 text-white',
    'Electronics': 'bg-purple-600 text-white',
    'curtains': 'bg-indigo-600 text-white',
    'carpets': 'bg-orange-600 text-white',
    'Home Decor': 'bg-teal-600 text-white',
    'Cutlery': 'bg-rose-600 text-white'
  };
  return colors[categoryName] || 'bg-gray-600 text-white';
};

const ProductCatalogtest = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  
  // State for fetched data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [transformedCategories, setTransformedCategories] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log("Fetched products:", res.data);
      setProducts(res.data);
      setTotalProducts(res.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getallcategories();
      console.log("Fetched categories:", res.data);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await getallsubcategories();
      console.log("Fetched subcategories:", res);
      setSubCategories(res);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Transform categories when data loads
  useEffect(() => {
    if (categories.length > 0 && subcategories.length > 0) {
      const transformed = transformCategories(categories, subcategories);
      setTransformedCategories(transformed);
      console.log("Transformed categories:", transformed);
    }
  }, [categories, subcategories]);

  const filterProducts = () => {
    let filtered = [...products].filter(product => {
      // Get category name from the category object
      const productCategory = product.category?.name || product.category;
      const productSubCategory = product.subCategory?.name || product.subCategory;
      
      if (selectedCategory !== 'all' && productCategory !== selectedCategory) return false;
      if (selectedSubCategory !== 'all' && productSubCategory !== selectedSubCategory) return false;
      if (searchTerm) {
        const matchesSearch = 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          (product.category?.name || product.category || '').toLowerCase().includes(searchTerm) ||
          (product.subCategory?.name || product.subCategory || '').toLowerCase().includes(searchTerm);
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
        filtered.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.IsNew ? 1 : 0) - (a.IsNew ? 1 : 0));
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
              Discover {totalProducts}+ amazing products tailored just for you
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
          categories={transformedCategories}
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
            categories={transformedCategories}
            onRemoveSearch={clearSearch}
            onRemoveCategory={() => handleCategorySelect('all')}
            onRemoveSubCategory={() => handleSubCategorySelect(selectedCategory, 'all')}
          />
        </div>

        {sortedProducts.length === 0 ? (
          <EmptyState searchTerm={searchTerm} onClearFilters={clearAllFilters} />
        ) : (
          <>
            <ProductGrid 
              products={visibleProducts.map(product => ({
                ...product,
                // Transform product data to match expected format by ProductGrid component
                id: product._id,
                image: product.images && product.images[0] ? product.images[0] : '/api/placeholder/400/400',
                rating: product.ratings || 0,
                reviews: product.numReviews || 0,
                isNew: product.IsNew,
                subCategory: product.subCategory?.name || product.subCategory || 'General'
              }))} 
              view={view} 
            />
            
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