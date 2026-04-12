// pages/ProductDescription.jsx
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
import { productsdes } from '../data/ProductData';

const ProductDescriptiontest = () => {
  const { id } = useParams();
  const [quantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = useMemo(() => {
    return productsdes.find(p => p.id === parseInt(id)) || productsdes[0];
  }, [id]);

  const checkWishlistStatus = useCallback(() => {
    if (product && product.id) {
      return isInWishlist(product.id);
    }
    return false;
  }, [product, isInWishlist]);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      
      setIsInWishlistState(checkWishlistStatus());
      
      try {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        if (!viewed.find(p => p.id === product.id)) {
          viewed.unshift({ 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            image: product.image 
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
  }, [product, checkWishlistStatus, selectedColor]);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;
    addToCart({ ...product, quantity, selectedColor });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }, [addToCart, product, quantity, selectedColor]);

  const handleWishlist = useCallback(() => {
    if (isInWishlistState) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsInWishlistState(!isInWishlistState);
  }, [isInWishlistState, removeFromWishlist, addToWishlist, product]);

  const handleImageZoom = useCallback((index) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  }, []);

  const getRelatedProducts = useCallback(() => {
    if (!product) return [];
    return productsdes
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const calculateDeliveryDate = useCallback(() => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
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
      <Breadcrumb product={product} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery 
            product={product}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onImageZoom={handleImageZoom}
            onVideoClick={() => setActiveTab('video')}
          />
          
          <div>
            <ProductInfo 
              product={product}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
              calculateDeliveryDate={calculateDeliveryDate}
            />
            <ProductActions 
              product={product}
              isAdded={isAdded}
              isInWishlistState={isInWishlistState}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
            />
          </div>
        </div>

        <ProductTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          product={product}
          calculateDeliveryDate={calculateDeliveryDate}
        />

        <RecentlyViewed products={recentlyViewed} />
        <RelatedProducts products={getRelatedProducts()} />
      </div>

      <ImageModal 
        isOpen={showImageModal}
        images={product.images}
        selectedIndex={selectedImageIndex}
        onClose={() => setShowImageModal(false)}
        onIndexChange={setSelectedImageIndex}
      />
    </motion.div>
  );
};

export default ProductDescriptiontest;