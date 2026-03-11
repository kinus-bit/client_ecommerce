// pages/ProductCatalog.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

const ProductCatalog = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = {
    electronics: {
      name: 'Electronics',
      subCategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories']
    },
    fashion: {
      name: 'Fashion',
      subCategories: ['Men', 'Women', 'Kids', 'Accessories']
    },
    home: {
      name: 'Home & Living',
      subCategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding']
    },
    sports: {
      name: 'Sports',
      subCategories: ['Equipment', 'Clothing', 'Footwear', 'Accessories']
    }
  };

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      category: 'electronics',
      subCategory: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      rating: 4.8,
      reviews: 245
    },
    {
      id: 2,
      name: 'MacBook Pro',
      price: 1299,
      category: 'electronics',
      subCategory: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      rating: 4.9,
      reviews: 189
    },
    {
      id: 3,
      name: 'Men\'s Jacket',
      price: 89,
      category: 'fashion',
      subCategory: 'Men',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      rating: 4.5,
      reviews: 78
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-purple-600 text-white' : 'bg-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-purple-600 text-white' : 'bg-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="md:w-64 bg-white p-6 rounded-lg shadow-lg h-fit"
              >
                <h2 className="font-semibold mb-4">Categories</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(categories).map(([key, category]) => (
                    <option key={key} value={key}>{category.name}</option>
                  ))}
                </select>

                {selectedCategory !== 'all' && (
                  <>
                    <h2 className="font-semibold mb-4">Sub Categories</h2>
                    <select
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      className="w-full p-2 border rounded mb-4"
                    >
                      <option value="all">All Sub Categories</option>
                      {categories[selectedCategory]?.subCategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </>
                )}

                <h2 className="font-semibold mb-4">Price Range</h2>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden group">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-sm">
                        ${product.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>
                      <p className="text-sm text-gray-600">{product.subCategory}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCatalog;