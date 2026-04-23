// pages/ProductDescriptiontest.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Breadcrumb,
  ProductImageGallery,
  ProductInfo,
  ProductActions,
  ProductTabs,
  RelatedProducts,
  RecentlyViewed,
  ImageModal
} from '../components/productdescription';
import { getProductById, getAllProducts, addtocart } from '@/services/api';

const ProductDescriptiontest = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { addToCart: updateLocalCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Fetch single product by ID
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductById(id);
      console.log('Product fetched:', response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products for related products
  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log('All products fetched:', response.data);
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchAllProducts();
    }
  }, [id]);

  // Transform product data for the components
  const transformedProduct = useMemo(() => {
    if (!product) return null;
    
    return {
      id: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      images: product.images && product.images.length > 0 ? product.images : ['/api/placeholder/400/400'],
      image: product.images && product.images[0] ? product.images[0] : '/api/placeholder/400/400',
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
      deliveryEstimate: '5-7 business days',
      pickupLocation: 'Main Store',
      isNew: product.IsNew || false,
      discount: product.discount || 0,
      comments: product.comments || '',
      video: null,
      features: product.highlights ? product.highlights.slice(0, 3).map(highlight => ({
        icon: null,
        text: highlight
      })) : []
    };
  }, [product]);

  const checkWishlistStatus = useCallback(() => {
    if (transformedProduct && transformedProduct.id) {
      return isInWishlist(transformedProduct.id);
    }
    return false;
  }, [transformedProduct, isInWishlist]);

  useEffect(() => {
    if (transformedProduct) {
      if (transformedProduct.colors && transformedProduct.colors.length > 0 && !selectedColor) {
        setSelectedColor(transformedProduct.colors[0]);
      }
      
      setIsInWishlistState(checkWishlistStatus());
      
      try {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        if (!viewed.find(p => p.id === transformedProduct.id)) {
          viewed.unshift({ 
            id: transformedProduct.id, 
            name: transformedProduct.name, 
            price: transformedProduct.price, 
            image: transformedProduct.image 
          });
          if (viewed.length > 6) viewed.pop();
          localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
        }
        setRecentlyViewed(viewed.slice(0, 4));
      } catch (error) {
        console.error('Error managing recently viewed:', error);
      }
    }
    
    setSelectedImage(0);
    setSelectedImageIndex(0);
    setIsAdded(false);
    setQuantity(1);
  }, [transformedProduct, checkWishlistStatus, selectedColor]);

  // Handle add to cart with backend API
  const handleAddToCart = useCallback(async () => {
    if (!transformedProduct || !transformedProduct.inStock) return;
    
    try {
      setIsAddingToCart(true);
      
      // Prepare data for backend
      const cartData = {
        productId: transformedProduct.id,
        quantity: quantity
      };
      
      console.log('Adding to cart:', cartData);
      
      // Call backend API
      const response = await addtocart(cartData);
      console.log('Cart response:', response);
      
      // Also update local cart context for immediate UI feedback
      updateLocalCart({ 
        ...transformedProduct, 
        quantity, 
        selectedColor 
      });
      
      // Show success message
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to add to cart. Please try again.';
      setError(errorMessage);
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsAddingToCart(false);
    }
  }, [transformedProduct, quantity, selectedColor, updateLocalCart]);

  const handleWishlist = useCallback(() => {
    if (!transformedProduct) return;
    
    if (isInWishlistState) {
      removeFromWishlist(transformedProduct.id);
    } else {
      addToWishlist(transformedProduct);
    }
    setIsInWishlistState(!isInWishlistState);
  }, [isInWishlistState, removeFromWishlist, addToWishlist, transformedProduct]);

  const handleImageZoom = useCallback((index) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  }, []);

  const getRelatedProducts = useCallback(() => {
    if (!transformedProduct || !allProducts.length) return [];
    return allProducts
      .filter(p => p.category?._id === product?.category?._id && p._id !== transformedProduct.id)
      .slice(0, 4)
      .map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.images && p.images[0] ? p.images[0] : '/api/placeholder/400/400',
        category: p.category?.name || 'General'
      }));
  }, [transformedProduct, allProducts, product]);

  const calculateDeliveryDate = useCallback(() => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  // Show loading state
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

  // Show error or not found state
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
      {/* Error Toast Message */}
      {error && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-top">
          {error}
        </div>
      )}
      
      <Breadcrumb product={transformedProduct} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery 
            product={transformedProduct}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onImageZoom={handleImageZoom}
            onVideoClick={() => setActiveTab('video')}
          />
          
          <div>
            <ProductInfo 
              product={transformedProduct}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              calculateDeliveryDate={calculateDeliveryDate}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <ProductActions 
              product={transformedProduct}
              isAdded={isAdded}
              isInWishlistState={isInWishlistState}
              isAddingToCart={isAddingToCart}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
            />
          </div>
        </div>

        <ProductTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          product={transformedProduct}
          calculateDeliveryDate={calculateDeliveryDate}
        />

        <RecentlyViewed products={recentlyViewed} />
        <RelatedProducts products={getRelatedProducts()} />
      </div>

      <ImageModal 
        isOpen={showImageModal}
        images={transformedProduct.images}
        selectedIndex={selectedImageIndex}
        onClose={() => setShowImageModal(false)}
        onIndexChange={setSelectedImageIndex}
      />
    </motion.div>
  );
};

export default ProductDescriptiontest;