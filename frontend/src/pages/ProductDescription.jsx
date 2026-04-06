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
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      originalPrice: 1099,
      description: 'Experience the power of the iPhone 15 Pro with its advanced camera system, A17 Pro chip, and stunning design. Built to last, designed to impress.',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
        'https://istore.co.bw/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-2__WWEN_59655904-0c0a-49a0-91c0-e1d06b4536a5_2048x.jpg?v=1697794578',
        'https://epicdeals.co.za/wp-content/uploads/2025/09/AB472339-84A9-4593-A261-92173EEC91D4.jpg',
        'https://i.ytimg.com/vi/whGOeFAA5Q8/hqdefault.jpg',
      ],
      rating: 4.8,
      reviews: 245,
      inStock: true,
      stockCount: 15,
      colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
      specifications: {
        'Processor': 'A17 Pro',
        'Display': '6.1" Super Retina XDR',
        'Camera': '48MP Main | 12MP Ultra Wide',
        'Battery': 'Up to 23 hours video playback',
        'Weight': '187 grams',
        'Water Resistance': 'IP68'
      },
      highlights: [
        'Titanium design — strong, light, and durable',
        'A17 Pro chip — next-level gaming and performance',
        'Camera system — more detail, less noise',
        'USB-C — faster transfers and charging'
      ],
      category: 'electronics',
      subCategory: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      isNew: true,
      discount: 9,
      sku: 'IP15P-256-BLK',
      brand: 'Apple',
      warranty: '1 Year Limited',
      deliveryEstimate: 'Dec 15 - Dec 18',
      pickupLocation: 'Thika Store',
      video: 'https://www.youtube.com/embed/8QWgLcYyN7c',
      features: [
        { icon: <Camera />, text: '48MP Main Camera' },
        { icon: <Zap />, text: 'A17 Pro Chip' },
        { icon: <Battery />, text: 'All-day Battery' }
      ],
      review: []
    },
    {
      id: 2,
      name: 'MacBook Pro',
      price: 1299,
      originalPrice: 1499,
      description: 'The ultimate pro laptop featuring the revolutionary M3 chip, Liquid Retina XDR display, and all-day battery life. Perfect for creators, developers, and power users.',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
        'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=600',
      ],
      rating: 4.9,
      reviews: 189,
      inStock: true,
      stockCount: 8,
      colors: ['Space Gray', 'Silver'],
      specifications: {
        'Processor': 'Apple M3 chip with 8-core CPU',
        'Display': '14.2" Liquid Retina XDR',
        'Memory': '16GB unified memory',
        'Storage': '512GB SSD',
        'Battery': 'Up to 18 hours',
        'Weight': '3.5 pounds'
      },
      highlights: [
        'M3 chip — next-generation pro performance',
        'Liquid Retina XDR display with ProMotion',
        'Up to 22 hours of battery life',
        'Studio-quality three-mic array'
      ],
      category: 'electronics',
      subCategory: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      isNew: true,
      discount: 13,
      sku: 'MBP14-M3-512',
      brand: 'Apple',
      warranty: '1 Year Limited',
      deliveryEstimate: 'Dec 14 - Dec 16',
      pickupLocation: 'Thika Store',
      video: 'https://www.youtube.com/embed/0a9iDp46gHc',
      features: [
        { icon: <Zap />, text: 'M3 Chip' },
        { icon: <Battery />, text: '22 Hours Battery' },
        { icon: <Award />, text: 'Pro Display' }
      ]
      
    },
    {
      id: 3,
      name: 'Men\'s Leather Jacket',
      price: 89,
      originalPrice: 109,
      description: 'Classic men\'s genuine leather jacket crafted from premium quality materials. Features a stylish design with comfortable fit, perfect for casual outings and formal events.',
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
        'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600',
        'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600',
      ],
      rating: 4.5,
      reviews: 78,
      inStock: true,
      stockCount: 25,
      colors: ['Black', 'Brown', 'Tan'],
      specifications: {
        'Material': '100% Genuine Leather',
        'Lining': 'Polyester',
        'Closure': 'Zipper with snap button',
        'Pockets': '2 side pockets, 2 chest pockets',
        'Care': 'Professional leather clean only',
        'Fit': 'Regular fit'
      },
      highlights: [
        'Premium genuine leather construction',
        'Soft satin lining for comfort',
        'Multiple pockets for storage',
        'Classic biker style design'
      ],
      category: 'fashion',
      subCategory: 'Men',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      isNew: false,
      discount: 18,
      sku: 'LJ-BLK-42',
      brand: 'Urban Style',
      warranty: '30 Days',
      deliveryEstimate: 'Dec 13 - Dec 15',
      pickupLocation: 'Thika Store',
      review: []
    },
    {
      id: 4,
      name: 'Samsung Galaxy S24',
      price: 899,
      originalPrice: 999,
      description: 'Experience the future with Galaxy S24. Powered by advanced AI features, pro-grade camera system, and the most durable display on a smartphone.',
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600',
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&angle=90',
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&angle=180',
      ],
      rating: 4.7,
      reviews: 156,
      inStock: true,
      stockCount: 20,
      colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
      specifications: {
        'Processor': 'Snapdragon 8 Gen 3',
        'Display': '6.2" Dynamic AMOLED 2X',
        'Camera': '50MP Main | 12MP Ultra Wide | 10MP Tele',
        'Battery': '4000 mAh',
        'Storage': '128GB/256GB',
        'Water Resistance': 'IP68'
      },
      highlights: [
        'Galaxy AI — intelligent features for everyday',
        'Nightography — incredible low-light photos',
        'Adaptive refresh rate from 1-120Hz',
        'Corning Gorilla Glass Victus 2'
      ],
      category: 'electronics',
      subCategory: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      isNew: true,
      discount: 10,
      sku: 'GS24-256-BLK',
      brand: 'Samsung',
      warranty: '1 Year',
      deliveryEstimate: 'Dec 16 - Dec 19',
      review: []
    },
    {
      id: 5,
      name: 'Women\'s Summer Dress',
      price: 59,
      originalPrice: 69,
      description: 'Light and breezy summer dress perfect for warm days. Features a flattering fit and beautiful floral pattern that transitions seamlessly from day to night.',
      images: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
      ],
      rating: 4.6,
      reviews: 92,
      inStock: true,
      stockCount: 35,
      colors: ['Floral Print', 'Solid Black', 'Navy Blue', 'Burgundy'],
      specifications: {
        'Material': '100% Rayon',
        'Length': 'Midi',
        'Neckline': 'V-Neck',
        'Sleeve': 'Short Sleeve',
        'Care': 'Machine wash cold',
        'Fit': 'True to size'
      },
      highlights: [
        'Breathable and lightweight fabric',
        'Flattering A-line silhouette',
        'Hidden side pockets',
        'Adjustable straps'
      ],
      category: 'fashion',
      subCategory: 'Women',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      isNew: false,
      discount: 14,
      sku: 'DR-FLR-SML',
      brand: 'Chic Style',
      warranty: '15 Days',
      deliveryEstimate: 'Dec 12 - Dec 14',
      review: []
    },
    {
      id: 6,
      name: 'Modern Sofa Set',
      price: 799,
      originalPrice: 899,
      description: 'Elevate your living space with this contemporary 3-seater sofa set. Features premium fabric upholstery, high-density foam cushions, and a sleek design.',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600',
        'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&angle=90',
      ],
      rating: 4.4,
      reviews: 67,
      inStock: true,
      stockCount: 5,
      colors: ['Gray', 'Beige', 'Blue', 'Green'],
      specifications: {
        'Material': 'Premium Fabric',
        'Frame': 'Solid Wood',
        'Fill': 'High-density foam',
        'Seating': '3-seater + 2-seater',
        'Weight Capacity': '300 kg',
        'Assembly': 'Required'
      },
      highlights: [
        'Sturdy wooden frame construction',
        'Removable and washable covers',
        'Pocket spring seating for comfort',
        'Modern Scandinavian design'
      ],
      category: 'home',
      subCategory: 'Furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      isNew: false,
      discount: 11,
      sku: 'SOFA-MDN-3S',
      brand: 'Home Comfort',
      warranty: '2 Years',
      deliveryEstimate: 'Dec 20 - Dec 23',
      review: []
    },
    {
      id: 7,
      name: 'Wireless Headphones',
      price: 199,
      originalPrice: 249,
      description: 'Immerse yourself in premium sound with active noise cancellation, 30-hour battery life, and crystal-clear call quality. The perfect companion for music lovers.',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&angle=90',
      ],
      rating: 4.7,
      reviews: 423,
      inStock: true,
      stockCount: 50,
      colors: ['Black', 'White', 'Blue', 'Red'],
      specifications: {
        'Driver': '40mm dynamic',
        'Frequency': '20Hz - 20kHz',
        'Battery': '30 hours',
        'Connectivity': 'Bluetooth 5.3',
        'Charging': 'USB-C',
        'Weight': '250 grams'
      },
      highlights: [
        'Industry-leading noise cancellation',
        'Quick charge - 5 hours in 10 minutes',
        'Multipoint connection',
        'Foldable design for travel'
      ],
      category: 'electronics',
      subCategory: 'Accessories',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      isNew: false,
      discount: 20,
      sku: 'HP-WL-ANC',
      brand: 'AudioTech',
      warranty: '1 Year',
      deliveryEstimate: 'Dec 13 - Dec 15',
      review: []
    },
    {
      id: 8,
      name: 'Yoga Mat',
      price: 29,
      originalPrice: 39,
      description: 'Eco-friendly non-slip yoga mat made from natural materials. Provides excellent grip and cushioning for all types of yoga and fitness activities.',
      images: [
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600',
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600',
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&angle=90',
      ],
      rating: 4.5,
      reviews: 234,
      inStock: true,
      stockCount: 100,
      colors: ['Purple', 'Green', 'Blue', 'Black'],
      specifications: {
        'Material': 'Natural Rubber',
        'Thickness': '6mm',
        'Length': '72 inches',
        'Width': '24 inches',
        'Weight': '2.5 lbs',
        'Care': 'Wipe clean with damp cloth'
      },
      highlights: [
        'Eco-friendly and biodegradable',
        'Double-sided non-slip surface',
        'Alignment lines for proper form',
        'Free carry strap included'
      ],
      category: 'sports',
      subCategory: 'Equipment',
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400',
      isNew: true,
      discount: 26,
      sku: 'YM-ECO-6MM',
      brand: 'Wellness Pro',
      warranty: '6 Months',
      deliveryEstimate: 'Dec 11 - Dec 13',
      review: []
    },
    {
      id: 9,
      name: 'Coffee Table',
      price: 199,
      originalPrice: 209,
      description: 'Minimalist coffee table crafted from solid wood with a sleek modern design. Features a lower shelf for additional storage and magazines.',
      images: [
        'https://dignity.co.ke/wp-content/uploads/2025/04/COFFEE-TABLE-92350-CTGY-GD.webp',
        'https://target.scene7.com/is/image/Target/GUEST_fc9fb958-4d17-47a2-a540-f5784a25846e?wid=300&hei=300&fmt=pjpeg',
        'https://ak1.ostkcdn.com/images/products/is/images/direct/8be1ebabf298e1f2755cd0b4b6ad2bf1a7d1a011/High-Gloss-Multi-Storage-Coffee-Table-with-4-Drawers.jpg?impolicy=medium',
        'https://img5.su-cdn.com/cdn-cgi/image/width=1000,height=1000/mall/file/2023/05/23/0d731e5baa3d95cf421a398d62c1345e.jpg',
      ],
      rating: 4.3,
      reviews: 89,
      inStock: true,
      stockCount: 12,
      colors: ['Walnut', 'Oak', 'White', 'Black'],
      specifications: {
        'Material': 'Solid Wood',
        'Dimensions': '47" L x 24" W x 18" H',
        'Finish': 'Matte lacquer',
        'Assembly': 'Minimal required',
        'Weight': '35 lbs',
        'Weight Capacity': '50 lbs'
      },
      highlights: [
        '100% solid wood construction',
        'Scratch-resistant surface',
        'Open shelf for storage',
        'Non-marking floor protectors'
      ],
      category: 'home',
      subCategory: 'Furniture',
      image: 'https://images.unsplash.com/photo-1532372320978-9b4b38f2c8b4?w=400',
      isNew: false,
      discount: 5,
      sku: 'TBL-CFF-WLT',
      brand: 'Modern Living',
      warranty: '1 Year',
      deliveryEstimate: 'Dec 18 - Dec 21',
      review: []
    }
  ];

  // Memoize the product to prevent unnecessary recalculations
  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id)) || products[0];
  }, [id]);

  // Use useCallback for functions that might be used in dependencies
  const checkWishlistStatus = useCallback(() => {
    if (product && product.id) {
      return isInWishlist(product.id);
    }
    return false;
  }, [product, isInWishlist]);

  // useEffect with proper dependencies
  useEffect(() => {
    if (product) {
      // Set initial color if available
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      
      // Set current stock
      setCurrentStock(product.stockCount);
      
      // Check wishlist status
      setIsInWishlistState(checkWishlistStatus());
      
      // Track recently viewed
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
    
    // Reset selected image when product changes
    setSelectedImage(0);
    setSelectedImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
    setShowShareOptions(false);
    
  }, [product, checkWishlistStatus, selectedColor]); // Added selectedColor to dependencies

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;
    
    addToCart({ ...product, quantity, selectedColor });
    setIsAdded(true);
    setCurrentStock(prev => Math.max(0, prev - quantity));
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

  const handleShare = useCallback((platform) => {
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
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(product.images[0])}&description=${encodeURIComponent(text)}`, '_blank');
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
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const calculateDeliveryDate = useCallback(() => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  // If product not found, show loading or error
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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="text-gray-500 hover:text-amber-600 transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-amber-600 transition-colors">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New Arrival
                  </div>
                )}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
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
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Video Thumbnail if available */}
            {product.video && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <button 
                  onClick={() => setActiveTab('video')}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Watch Product Video</span>
                </button>
              </motion.div>
            )}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.brand}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.inStock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Free shipping included</p>
              
              {/* Price Alert */}
              {product.price < product.originalPrice && (
                <div className="mt-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <Gift className="w-4 h-4" />
                  <span>Special offer! {product.discount}% off regular price</span>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="flex gap-4 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Key highlights</h3>
              <ul className="space-y-2">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed border-t border-b border-gray-200 py-4">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <span className="text-sm text-amber-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
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

            {/* Quantity */}
            {/* *************************TO BE IMPLEMENTED LATER**************************** */}
            {/* <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                    disabled={quantity >= product.stockCount}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount} available
                </span>
                {product.stockCount <= 5 && (
                  <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    Only {product.stockCount} left!
                  </span>
                )}
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  !product.inStock 
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : isAdded
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
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
                <p className="text-xs font-medium text-gray-900">{product.warranty || '2 Year'} Warranty</p>
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
                  <p className="text-gray-600">{product.deliveryEstimate || calculateDeliveryDate()} if you order in the next 4 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm mt-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium text-gray-900">Pickup available</p>
                  <p className="text-gray-600">at {product.pickupLocation || 'San Francisco store'} - Ready today</p>
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
              {['specifications', 'reviews', 'shipping', 'video'].map((tab) => (
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
                  {Object.entries(product.specifications).map(([key, value]) => (
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
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.user}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600">
                          <ThumbsUp className="w-4 h-4" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                  )}
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
                      <p className="text-sm text-gray-600">Free • Estimated delivery: {product.deliveryEstimate || calculateDeliveryDate()}</p>
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

            {activeTab === 'video' && product.video && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={product.video}
                    title={`${product.name} video`}
                    className="w-full h-[400px] rounded-lg"
                    allowFullScreen
                  />
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
                <Link to={`/product/${item.id}`} key={item.id}>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getRelatedProducts().map((relatedProduct) => (
              <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
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
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
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