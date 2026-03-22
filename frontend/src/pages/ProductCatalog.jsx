// pages/ProductCatalog.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, ChevronDown, X, SlidersHorizontal, Sparkles } from 'lucide-react';

const ProductCatalog = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // NEW STATE: Track how many products to show
  const [visibleCount, setVisibleCount] = useState(5); // Start with 5 products
  
  // All products data (unchanged)
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      category: 'electronics',
      subCategory: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      rating: 4.8,
      reviews: 245,
      isNew: true,
      discount: 0,
      description: 'The most powerful iPhone ever with A17 Pro chip'
    },
    {
      id: 2,
      name: 'MacBook Pro',
      price: 1299,
      category: 'electronics',
      subCategory: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      rating: 4.9,
      reviews: 189,
      isNew: true,
      discount: 0,
      description: 'Supercharged for pros with M3 chip'
    },
    {
      id: 3,
      name: 'Men\'s Leather Jacket',
      price: 89,
      category: 'fashion',
      subCategory: 'Men',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      rating: 4.5,
      reviews: 78,
      isNew: false,
      discount: 20,
      description: 'Premium genuine leather jacket'
    },
    {
      id: 4,
      name: 'Samsung Galaxy S24',
      price: 899,
      category: 'electronics',
      subCategory: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      rating: 4.7,
      reviews: 156,
      isNew: true,
      discount: 0,
      description: 'Next-level AI features and camera'
    },
    {
      id: 5,
      name: 'Women\'s Summer Dress',
      price: 59,
      category: 'fashion',
      subCategory: 'Women',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      rating: 4.6,
      reviews: 92,
      isNew: false,
      discount: 15,
      description: 'Light and breezy for summer days'
    },
    {
      id: 6,
      name: 'Modern Sofa Set',
      price: 799,
      category: 'home',
      subCategory: 'Furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      rating: 4.4,
      reviews: 67,
      isNew: false,
      discount: 10,
      description: 'Contemporary design with premium fabric'
    },
    {
      id: 7,
      name: 'Wireless Headphones',
      price: 199,
      category: 'electronics',
      subCategory: 'Accessories',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4.7,
      reviews: 423,
      isNew: false,
      discount: 0,
      description: 'Premium sound with noise cancellation'
    },
    {
      id: 8,
      name: 'Yoga Mat',
      price: 29,
      category: 'sports',
      subCategory: 'Equipment',
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400',
      rating: 4.5,
      reviews: 234,
      isNew: true,
      discount: 0,
      description: 'Eco-friendly non-slip yoga mat'
    },
    {
      id: 9,
      name: 'Coffee Table',
      price: 199,
      category: 'home',
      subCategory: 'Furniture',
      image: 'https://dignity.co.ke/wp-content/uploads/2025/04/COFFEE-TABLE-92350-CTGY-GD.webp',
      rating: 4.3,
      reviews: 89,
      isNew: false,
      discount: 5,
      description: 'Minimalist design with solid wood'
    }
  ];
  
  const categories = {
    electronics: {
      name: 'Electronics',
      subCategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories'],
      icon: '💻',
      color: 'blue'
    },
    fashion: {
      name: 'Fashion',
      subCategories: ['Men', 'Women', 'Kids', 'Accessories'],
      icon: '👔',
      color: 'rose'
    },
    home: {
      name: 'Home & Living',
      subCategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding'],
      icon: '🏠',
      color: 'amber'
    },
    sports: {
      name: 'Sports',
      subCategories: ['Equipment', 'Clothing', 'Footwear', 'Accessories'],
      icon: '⚽',
      color: 'emerald'
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // Reset visible count when searching
    setVisibleCount(5);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
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

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // NEW FUNCTION: Load more products
  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  // NEW: Get the visible products based on visibleCount
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  
  // NEW: Check if there are more products to load
  const hasMoreProducts = visibleCount < sortedProducts.length;

  // Reset visible count when filters change
  const handleFilterChange = (action) => {
    setVisibleCount(5);
    if (action === 'clear') {
      setSelectedCategory('all');
      setSelectedSubCategory('all');
      setSearchTerm('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Product Catalog
              </h1>
              <p className="text-gray-600">
                Discover {products.length}+ amazing products tailored just for you
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full md:w-80 px-4 py-3 pl-10 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setVisibleCount(5);
                  }}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setVisibleCount(5);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Products
            </motion.button>
            {Object.entries(categories).map(([key, category]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedSubCategory('all');
                  setVisibleCount(5);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 ${
                  selectedCategory === key
                    ? `bg-${category.color}-500 text-white shadow-md`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setVisibleCount(5);
                }}
                className="w-full sm:w-48 appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium text-gray-700 cursor-pointer"
              >
                <option value="featured">✨ Featured</option>
                <option value="newest">🆕 Newest First</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💰 Price: High to Low</option>
                <option value="rating">⭐ Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchTerm) && (
                <span className="w-5 h-5 bg-amber-400 text-white rounded-full text-xs flex items-center justify-center">
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedSubCategory !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0)}
                </span>
              )}
            </motion.button>

            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${
                  view === 'grid' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${
                  view === 'list' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="md:w-80"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                      Filters
                    </h2>
                    {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchTerm) && (
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSubCategory('all');
                          setSearchTerm('');
                          setVisibleCount(5);
                        }}
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
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSubCategory('all');
                          setVisibleCount(5);
                        }}
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
                          onClick={() => {
                            setSelectedCategory(key);
                            setSelectedSubCategory('all');
                            setVisibleCount(5);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                            selectedCategory === key
                              ? `bg-${category.color}-50 text-${category.color}-700 font-medium`
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
                  {selectedCategory !== 'all' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-6"
                    >
                      <h3 className="font-medium text-gray-900 mb-3">Sub Categories</h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedSubCategory('all');
                            setVisibleCount(5);
                          }}
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
                            onClick={() => {
                              setSelectedSubCategory(sub);
                              setVisibleCount(5);
                            }}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{visibleProducts.length}</span> of <span className="font-medium text-gray-900">{sortedProducts.length}</span> {sortedProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              {/* Active Filters */}
              {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchTerm) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      🔍 "{searchTerm}"
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setVisibleCount(5);
                        }}
                        className="ml-1 hover:text-amber-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {categories[selectedCategory]?.icon} {categories[selectedCategory]?.name}
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSubCategory('all');
                          setVisibleCount(5);
                        }}
                        className="ml-1 hover:text-gray-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSubCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {selectedSubCategory}
                      <button
                        onClick={() => {
                          setSelectedSubCategory('all');
                          setVisibleCount(5);
                        }}
                        className="ml-1 hover:text-gray-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-gray-900 mb-2">No products found</p>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setSearchTerm('');
                    setVisibleCount(5);
                  }}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <>
                <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all ${
                        view === 'list' ? 'flex' : ''
                      }`}
                    >
                      <Link to={`/product/${product.id}`} className={view === 'list' ? 'flex w-full' : ''}>
                        <div className={`relative overflow-hidden ${view === 'list' ? 'w-48 shrink-0' : ''}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full ${view === 'list' ? 'h-48' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-700`}
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <span className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                                NEW
                              </span>
                            )}
                            {product.discount > 0 && (
                              <span className="bg-rose-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                          
                          {/* Price */}
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                            ${product.price}
                          </div>
                        </div>
                        
                        <div className={`p-5 ${view === 'list' ? 'flex-1' : ''}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              ({product.reviews})
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {product.subCategory}
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic that will be implemented later
                              }}
                            >
                              <Link to={`/product/${product.id}`}>
                               Details
                              </Link>
                            </motion.button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* NEW: Show More Button */}
                {hasMoreProducts && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mt-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={loadMoreProducts}
                      className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Show More Products
                        <svg 
                          className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.button>
                  </motion.div>
                )}

                {/* Optional: Show "All products loaded" message */}
                {!hasMoreProducts && sortedProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12 py-6"
                  >
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      You've reached the end! {sortedProducts.length} products loaded
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCatalog;