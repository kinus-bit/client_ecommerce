// pages/ProductDescription.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

import { 
  Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, 
  Check, ChevronRight, Package, Clock, Award, Share2, 
  Printer, Download, Gift, Zap, TrendingUp, Users,
  MessageCircle, ThumbsUp, Camera, Video, Plus, Battery
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getAllProducts, getProductById } from '@/services/api';

const ProductDescription = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Fetch single product by ID
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductById(id);
      console.log('Product fetched:', response.data);
      setProduct(response.data);
      
      // Set initial color if available
      if (response.data.colors && response.data.colors.length > 0 && !selectedColor) {
        setSelectedColor(response.data.colors[0]);
      }
      
      // Set current stock
      setCurrentStock(response.data.stock || 0);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products for related products
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log('All products fetched:', res.data);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchProducts();
    }
  }, [id]);

  // Check wishlist status
  const checkWishlistStatus = useCallback(() => {
    if (product && product._id) {
      return isInWishlist(product._id);
    }
    return false;
  }, [product, isInWishlist]);

  // Update wishlist status when product changes
  useEffect(() => {
    if (product) {
      setIsInWishlistState(checkWishlistStatus());
    }
  }, [product, checkWishlistStatus]);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      try {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        if (!viewed.find(p => p._id === product._id)) {
          viewed.unshift({ 
            _id: product._id, 
            name: product.name, 
            price: product.price, 
            image: product.images && product.images[0] ? product.images[0] : '/api/placeholder/400/400'
          });
          if (viewed.length > 6) viewed.pop();
          localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
        }
        setRecentlyViewed(viewed.slice(0, 4));
      } catch (error) {
        console.error('Error managing recently viewed:', error);
      }
    }
    
    // Reset states when product changes
    setSelectedImage(0);
    setSelectedImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
    setShowShareOptions(false);
    
  }, [product]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    
    if (isInWishlistState) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : '/api/placeholder/400/400',
        description: product.description
      });
    }
    setIsInWishlistState(!isInWishlistState);
  }, [isInWishlistState, removeFromWishlist, addToWishlist, product]);

  const handleShare = useCallback((platform) => {
    if (!product) return;
    
    const url = window.location.href;
    const text = `Check out ${product.name} on ShopHub!`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(product.images && product.images[0] ? product.images[0] : '')}&description=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy link');
        });
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  }, [product]);

  const handleImageZoom = useCallback((index) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  }, []);

  const getRelatedProducts = useCallback(() => {
    if (!product || !products.length) return [];
    return products
      .filter(p => p.category?._id === product.category?._id && p._id !== product._id)
      .slice(0, 4);
  }, [product, products]);

  const calculateDeliveryDate = useCallback(() => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  // Transform product data for display
  const transformedProduct = useMemo(() => {
    if (!product) return null;
    
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      images: product.images && product.images.length > 0 ? product.images : ['/api/placeholder/400/400'],
      rating: product.ratings || 0,
      reviews: product.numReviews || 0,
      inStock: product.stock > 0,
      stockCount: product.stock,
      colors: product.color || [],
      specifications: product.specifications ? 
        product.specifications.reduce((acc, spec, index) => {
          acc[`Specification ${index + 1}`] = spec;
          return acc;
        }, {}) : { 'No specifications': 'No specifications available' },
      highlights: product.highlights || [],
      category: product.category?.name || 'General',
      subCategory: product.subCategory?.name || 'General',
      sku: product._id?.slice(-8) || 'N/A',
      brand: product.category?.name || 'General',
      warranty: '1 Year Limited',
      deliveryEstimate: calculateDeliveryDate(),
      pickupLocation: 'Main Store',
      IsNew: product.IsNew || false,
      discount: product.discount || 0,
      comments: product.comments || '',
      reviewsList: [] // You can add reviews functionality later
    };
  }, [product, calculateDeliveryDate]);

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error || !transformedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="text-gray-500 hover:text-amber-600 transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={`/products?category=${transformedProduct.category}`} className="text-gray-500 hover:text-amber-600 transition-colors">
                {transformedProduct.category.charAt(0).toUpperCase() + transformedProduct.category.slice(1)}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{transformedProduct.name}</span>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Print"
              >
                <Printer className="w-4 h-4 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                title="Share"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </motion.button>
              
              {/* Share Options Dropdown */}
              <AnimatePresence>
                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20"
                  >
                    <button onClick={() => handleShare('facebook')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">Facebook</button>
                    <button onClick={() => handleShare('twitter')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">Twitter</button>
                    <button onClick={() => handleShare('pinterest')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">Pinterest</button>
                    <button onClick={() => handleShare('copy')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">Copy Link</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <div 
                className="relative bg-white rounded-2xl overflow-hidden shadow-sm cursor-zoom-in"
                onClick={() => handleImageZoom(selectedImage)}
              >
                <img
                  src={transformedProduct.images[selectedImage]}
                  alt={transformedProduct.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
                {transformedProduct.originalPrice && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${transformedProduct.originalPrice - transformedProduct.price}
                  </div>
                )}
                {transformedProduct.IsNew && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New Arrival
                  </div>
                )}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {transformedProduct.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-xl overflow-hidden bg-white shadow-sm ${
                    selectedImage === index ? 'ring-2 ring-amber-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${transformedProduct.name} view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title & Rating */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{transformedProduct.name}</h1>
                  <p className="text-sm text-gray-500">SKU: {transformedProduct.sku}</p>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {transformedProduct.brand}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(transformedProduct.rating)
                            ? 'fill-current'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {transformedProduct.rating} ({transformedProduct.reviews} reviews)
                  </span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  transformedProduct.inStock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {transformedProduct.inStock ? `${transformedProduct.stockCount} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">${transformedProduct.price}</span>
                {transformedProduct.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">${transformedProduct.originalPrice}</span>
                    <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                      Save {transformedProduct.discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Free shipping included</p>
              
              {/* Price Alert */}
              {transformedProduct.price < transformedProduct.originalPrice && (
                <div className="mt-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <Gift className="w-4 h-4" />
                  <span>Special offer! {transformedProduct.discount}% off regular price</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Key highlights</h3>
              <ul className="space-y-2">
                {transformedProduct.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed border-t border-b border-gray-200 py-4">
              {transformedProduct.description}
            </p>

            {/* Color Selection */}
            {transformedProduct.colors && transformedProduct.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <span className="text-sm text-amber-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {transformedProduct.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedColor === color
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={!transformedProduct.inStock}
                className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  !transformedProduct.inStock 
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : isAdded
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                <Link to="/signup" className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Link>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleWishlist}
                className={`px-6 py-3 border rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isInWishlistState
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlistState ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isInWishlistState ? 'Saved' : 'Save'}</span>
              </motion.button>    
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm mb-6">
              <div className="text-center">
                <Truck className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders $50+</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900">{transformedProduct.warranty} Warranty</p>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900">30 Days Return</p>
                <p className="text-xs text-gray-500">No questions asked</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium text-gray-900">Free delivery</p>
                  <p className="text-gray-600">{transformedProduct.deliveryEstimate} if you order in the next 4 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm mt-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium text-gray-900">Pickup available</p>
                  <p className="text-gray-600">at {transformedProduct.pickupLocation} - Ready today</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {['specifications', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 capitalize font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
            {activeTab === 'specifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(transformedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-start border-b border-gray-100 pb-3">
                      <span className="text-sm font-medium text-gray-500 w-32 capitalize">{key}</span>
                      <span className="text-sm text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                  <button className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Write a Review
                  </button>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Standard Shipping</p>
                      <p className="text-sm text-gray-600">Free • Estimated delivery: {transformedProduct.deliveryEstimate}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Express Shipping</p>
                      <p className="text-sm text-gray-600">$9.99 • Estimated delivery: 2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Package className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">International Shipping</p>
                      <p className="text-sm text-gray-600">Available for select countries • Rates calculated at checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((item) => (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                    <p className="text-amber-600 font-bold">${item.price}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {getRelatedProducts().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getRelatedProducts().map((relatedProduct) => (
                <Link to={`/product/${relatedProduct._id}`} key={relatedProduct._id}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img src={relatedProduct.images && relatedProduct.images[0] ? relatedProduct.images[0] : '/api/placeholder/400/400'} alt={relatedProduct.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-amber-600 font-bold">${relatedProduct.price}</p>
                      {relatedProduct.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">${relatedProduct.originalPrice}</p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-amber-500"
              >
                Close
              </button>
              <img
                src={transformedProduct.images[selectedImageIndex]}
                alt={transformedProduct.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {transformedProduct.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedImageIndex ? 'bg-amber-500 w-4' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDescription;