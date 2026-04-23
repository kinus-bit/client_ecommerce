// pages/ProductCatalog.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { Filter, Grid, List, Star, ChevronDown, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { getAllProducts, getallcategories, getallsubcategories } from '@/services/api';
import { useEffect } from 'react';
import { IconContext } from 'react-icons'; 
import { FaWhatsapp } from 'react-icons/fa';

// Icon mapping for categories
const getCategoryIcon = (categoryName) => {
  const icons = {
    'menfashion': '👔',
    'womenfashion': '👗',
    'furniture': '🪑',
    'drinks': '🍺',
    'Electronics': '📱',
    'curtains': '🧣',
    'carpets': '🧵',
    'Home Decor': '🏠',
    'Cutlery': '🍴'
  };
  return icons[categoryName] || '📦';
};

// Color mapping for categories
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

const getSidebarColor = (categoryName) => {
  const colors = {
    'menfashion': 'bg-blue-50 text-blue-700 font-medium',
    'womenfashion': 'bg-pink-50 text-pink-700 font-medium',
    'furniture': 'bg-amber-50 text-amber-700 font-medium',
    'drinks': 'bg-emerald-50 text-emerald-700 font-medium',
    'Electronics': 'bg-purple-50 text-purple-700 font-medium',
    'curtains': 'bg-indigo-50 text-indigo-700 font-medium',
    'carpets': 'bg-orange-50 text-orange-700 font-medium',
    'Home Decor': 'bg-teal-50 text-teal-700 font-medium',
    'Cutlery': 'bg-rose-50 text-rose-700 font-medium'
  };
  return colors[categoryName] || 'bg-gray-50 text-gray-700 font-medium';
};

const ProductCatalog = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  
  // Transform categories into the format expected by the component
  const [transformedCategories, setTransformedCategories] = useState({});
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setVisibleCount(5);
  };

  const fetchProducts = async () => {
    const res = await getAllProducts();
    console.log(res.data);
    setProducts(res.data);
    setTotalProducts(res.count);
  } 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const res = await getallcategories();
    console.log("Categories response:", res.data);
    setCategories(res.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    const res = await getallsubcategories();
    console.log("Subcategories response:", res);
    setSubCategories(res);
  }

  useEffect(() => {
    fetchSubcategories();
  }, []);

  // Transform categories and subcategories when data loads
  useEffect(() => {
    if (categories.length > 0 && subcategories.length > 0) {
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
      
      setTransformedCategories(transformed);
      console.log("Transformed categories:", transformed);
    }
  }, [categories, subcategories]);

  const filteredProducts = products.filter(product => {
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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.ratings || 0) - (a.ratings || 0);
      case 'newest':
        return (b.IsNew ? 1 : 0) - (a.IsNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < sortedProducts.length;

  // const handleFilterChange = (action) => {
  //   setVisibleCount(5);
  //   if (action === 'clear') {
  //     setSelectedCategory('all');
  //     setSelectedSubCategory('all');
  //     setSearchTerm('');
  //   }
  // };

  const handleClick = () => {
    window.location.href = "https://wa.me/254768332588";
  }
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
                Discover {totalProducts}+ amazing products tailored just for you
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
          {/* Category Pills with Dropdowns */}
          <div className="flex flex-row flex-wrap gap-2">
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
            
           {Object.entries(transformedCategories).map(([key, category]) => {
            // Check if category has subcategories
            const hasSubCategories = category.subCategories.length > 0;
            
            // If it has subcategories, wrap in DropdownMenu
            if (hasSubCategories) {
              return (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 ${
                        selectedCategory === key
                          ? category.color
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                      <ChevronDown className="w-3 h-3 ml-1 md:hidden lg:hidden" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCategory(key);
                        setSelectedSubCategory('all');
                        setVisibleCount(5);
                      }}
                      className="cursor-pointer"
                    >
                      All {category.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {category.subCategories.map((subCategory) => (
                      <DropdownMenuItem
                        key={subCategory}
                        onClick={() => {
                          setSelectedCategory(key);
                          setSelectedSubCategory(subCategory);
                          setVisibleCount(5);
                        }}
                        className="cursor-pointer"
                      >
                        {subCategory}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            
            // If no subcategories, render as a normal button (no dropdown)
            return (
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
                    ? category.color
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </motion.button>
            );
          })}
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
              className="md:hidden hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
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
                <div className="bg-white hidden md:block lg:block rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
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
                      {Object.entries(transformedCategories).map(([key, category]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedCategory(key);
                            setSelectedSubCategory('all');
                            setVisibleCount(5);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                            selectedCategory === key
                              ? getSidebarColor(key)
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
                  {selectedCategory !== 'all' && transformedCategories[selectedCategory]?.subCategories.length > 0 && (
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
                          All {transformedCategories[selectedCategory]?.name}
                        </button>
                        {transformedCategories[selectedCategory]?.subCategories.map(sub => (
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
                      {transformedCategories[selectedCategory]?.icon} {transformedCategories[selectedCategory]?.name}
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
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all ${
                        view === 'list' ? 'flex' : ''
                      }`}
                    >
                      <Link to={`/product/${product._id}`} className={view === 'list' ? 'flex w-full' : ''}>
                        <div className={`relative overflow-hidden ${view === 'list' ? 'w-48 shrink-0' : ''}`}>
                          <img
                            src={product.images && product.images[0] ? product.images[0] : '/api/placeholder/400/400'}
                            alt={product.name}
                            className={`w-full ${view === 'list' ? 'h-48' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-700`}
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.IsNew && (
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
                                    i < Math.floor(product.ratings || 0)
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              ({product.numReviews || 0})
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {product.subCategory?.name || product.subCategory || 'General'}
                            </span>
                           

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic that will be implemented later
                              }}
                            >
                               <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                              <div className="text-sm text-white bg-green-500 px-3 py-1 rounded-full flex items-center gap-1">
                               
                                chat
                                <FaWhatsapp onClick={handleClick}/>
                            
                              </div>
                            </IconContext.Provider>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium transition-opacity hover:bg-amber-500 
                                 md:opacity-0 md:group-hover:opacity-100 opacity-100"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic that will be implemented later
                              }}
                            >
                              <p>
                               Details
                              </p>
                            </motion.button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Show More Button */}
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

                {/* All products loaded message */}
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