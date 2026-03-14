// pages/ProductDescription.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Check, ChevronRight, Package, Clock, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDescription = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Space Black');
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    originalPrice: 1099,
    description: 'Experience the power of the iPhone 15 Pro with its advanced camera system, A17 Pro chip, and stunning design. Built to last, designed to impress.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&angle=90',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&angle=180',
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
    discount: 9
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
    discount: 13
  },
  {
    id: 3,
    name: 'Men\'s Leather Jacket',
    price: 89,
    originalPrice: 109,
    description: 'Classic men\'s genuine leather jacket crafted from premium quality materials. Features a stylish design with comfortable fit, perfect for casual outings and formal events.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac3?w=600',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600',
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
    discount: 18
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
    discount: 10
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
    discount: 14
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
    discount: 11
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
    discount: 20
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
    discount: 26
  },
  {
    id: 9,
    name: 'Coffee Table',
    price: 199,
    originalPrice: 209,
    description: 'Minimalist coffee table crafted from solid wood with a sleek modern design. Features a lower shelf for additional storage and magazines.',
    images: [
      'https://images.unsplash.com/photo-1532372320978-9b4b38f2c8b4?w=600',
      'https://images.unsplash.com/photo-1532320978-9b4b38f2c8b4?w=600&angle=90',
      'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=600',
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
    discount: 5
  }
];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-amber-600 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products?category=electronics" className="text-gray-500 hover:text-amber-600 transition-colors">Electronics</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{products.name}</span>
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
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
                <img
                  // src={products.images[selectedImage]}
                  // alt={products.name}
                  className="w-full h-[500px] object-cover"
                />
                {/* {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </div>
                )} */}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-4">
              {/* {products.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
              ))} */}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title & Rating */}
            <div className="mb-4">
              {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1> */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {/* {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))} */}
                  </div>
                  {/* <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span> */}
                </div>
                {/* <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {product.stockCount} in stock
                </span> */}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                {/* <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                )} */}
              </div>
              <p className="text-sm text-gray-500 mt-1">Free shipping included</p>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Key highlights</h3>
              <ul className="space-y-2">
                {/* {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))} */}
              </ul>
            </div>

            {/* Description */}
            {/* <p className="text-gray-600 mb-6 leading-relaxed border-t border-b border-gray-200 py-4">
              {product.description}
            </p> */}

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Color</h3>
                <span className="text-sm text-amber-600">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* {product.colors.map((color) => (
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
                ))} */}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {/* <span className="text-sm text-gray-500">
                  {product.stockCount} available
                </span> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                className={`flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 ${
                  isAdded ? 'bg-green-600 hover:bg-green-600' : ''
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
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Save</span>
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
                <p className="text-xs font-medium text-gray-900">2 Year Warranty</p>
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
                  <p className="text-gray-600">Dec 15 - Dec 18 if you order in the next 4 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm mt-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium text-gray-900">Pickup available</p>
                  <p className="text-gray-600">at San Francisco store - Ready today</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex items-start border-b border-gray-100 pb-3">
                  <span className="text-sm font-medium text-gray-500 w-32">{key}</span>
                  <span className="text-sm text-gray-900">{value}</span>
                </div>
              ))} */}
            </div>
          </div>
        </motion.div>

        {/* Related Products - You can add this section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">Product Name</h3>
                <p className="text-amber-600 font-bold">$199</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDescription;