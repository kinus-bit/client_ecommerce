
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
      category: 'menfashion',
      subCategory: 'Jackets',
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
      category: 'womenfashion',
      subCategory: 'dress',
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
      category: 'furniture',
      subCategory: 'chair',
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
      name: 'Coffee Table',
      price: 199,
      category: 'furniture',
      subCategory: 'Table',
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
      color: 'cyan'
    },
    furniture: {
      name: 'Furniture',
      subCategories: ['Beds', 'Kitchen tables', 'Study tables','Chairs','Closet'],
      icon: '🪑',
      color: 'rose'
    },
    drinks: {
      name: 'Drinks',
      subCategories: [],
      icon: '🥤',
      color: 'amber'
    },
    decor: {
      name: 'Home Decor',
      subCategories: [],
      icon: '🖼️',
      color: 'emerald'
    },
    cutlery: {
      name: 'Cutlery',
      subCategories: [],
      icon: '🍴',
      color: 'yellow'
    },
    menfashion: {
      name: 'Men Fashion',
      subCategories: ['Jeans', 'T-shirts', 'Sweaters', 'Jackets', 'shoes'],
      icon: '👔',
      color: 'violet'
    },
    womenfashion: {
      name: 'Women Fashion',
      subCategories: ['Tops', 'jeans', 'Trousers', 'skirts', 'jackets', 'bags', 'dress'],
      icon: '👗',
      color: 'pink'
    },
    curtains: {
      name: 'Curtains',
      subCategories: [],
      icon: '🪟',
      color: 'teal'
    },
    carpets: {
      name: 'Carpets',
      subCategories: [],
      icon: '🧵',
      color: 'orange'
    }
  };

  const colorClasses = {
    cyan: 'bg-cyan-500 text-white shadow-md',
    rose: 'bg-rose-500 text-white shadow-md',
    amber: 'bg-amber-500 text-white shadow-md',
    emerald: 'bg-emerald-500 text-white shadow-md',
    yellow: 'bg-yellow-500 text-white shadow-md',
    violet: 'bg-violet-500 text-white shadow-md',
    pink: 'bg-pink-500 text-white shadow-md',
    teal: 'bg-teal-500 text-white shadow-md',
    orange: 'bg-orange-500 text-white shadow-md',
  };

  const sidebarColorClasses = {
    cyan: 'bg-cyan-50 text-cyan-700 font-medium',
    rose: 'bg-rose-50 text-rose-700 font-medium',
    amber: 'bg-amber-50 text-amber-700 font-medium',
    emerald: 'bg-emerald-50 text-emerald-700 font-medium',
    yellow: 'bg-yellow-50 text-yellow-700 font-medium',
    violet: 'bg-violet-50 text-violet-700 font-medium',
    pink: 'bg-pink-50 text-pink-700 font-medium',
    teal: 'bg-teal-50 text-teal-700 font-medium',
    orange: 'bg-orange-50 text-orange-700 font-medium',
  };

  
  

export { products, categories, colorClasses, sidebarColorClasses };