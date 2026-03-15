// context/WishlistContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
        setWishlistCount(parsedWishlist.length);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setWishlistItems([]);
        setWishlistCount(0);
      }
    }
    setLoading(false);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      setWishlistCount(wishlistItems.length);
    }
  }, [wishlistItems, loading]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, show notification and return unchanged array
        showNotification('Item already in wishlist', 'info');
        return prevItems;
      } else {
        // Add new item with timestamp
        const newItem = {
          ...product,
          addedAt: new Date().toISOString()
        };
        showNotification(`${product.name} added to wishlist`, 'success');
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        showNotification(`${itemToRemove.name} removed from wishlist`, 'info');
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Toggle wishlist item
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    showNotification('Wishlist cleared', 'info');
  };

  // Get wishlist items count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Get total price of wishlist items
  const getWishlistTotal = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0);
  };

  // Get wishlist items grouped by category
  const getWishlistByCategory = () => {
    return wishlistItems.reduce((acc, item) => {
      const category = item.category || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  // Move item from wishlist to cart
  const moveToCart = (productId, addToCartFunction) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item && addToCartFunction) {
      addToCartFunction({ ...item, quantity: 1 });
      removeFromWishlist(productId);
      showNotification(`${item.name} moved to cart`, 'success');
    }
  };

  // Move all items from wishlist to cart
  const moveAllToCart = (addToCartFunction) => {
    if (wishlistItems.length > 0 && addToCartFunction) {
      wishlistItems.forEach(item => {
        addToCartFunction({ ...item, quantity: 1 });
      });
      clearWishlist();
      showNotification('All items moved to cart', 'success');
    }
  };

  // Check if wishlist has items
  const hasItems = () => {
    return wishlistItems.length > 0;
  };

  // Get recently added wishlist items
  const getRecentlyAdded = (limit = 4) => {
    return [...wishlistItems]
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
      .slice(0, limit);
  };

  // Get items by price range
  const getItemsByPriceRange = (minPrice, maxPrice) => {
    return wishlistItems.filter(item => 
      item.price >= minPrice && item.price <= maxPrice
    );
  };

  // Get items on sale (with discount)
  const getItemsOnSale = () => {
    return wishlistItems.filter(item => item.originalPrice && item.originalPrice > item.price);
  };

  // Get total potential savings
  const getTotalSavings = () => {
    return wishlistItems.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  // Get unique brands in wishlist
  const getUniqueBrands = () => {
    const brands = wishlistItems
      .map(item => item.brand)
      .filter(brand => brand);
    return [...new Set(brands)];
  };

  // Show notification function (you can integrate with your notification system)
  const showNotification = (message, type = 'info') => {
    // You can implement your notification system here
    // For now, we'll just console.log
    console.log(`[Wishlist ${type.toUpperCase()}]: ${message}`);
    
    // If you have a notification context, you can use it like:
    // if (typeof window !== 'undefined' && window.showToast) {
    //   window.showToast(message, type);
    // }
  };

  // Value object to be provided to consumers
  const value = {
    // State
    wishlistItems,
    wishlistCount,
    loading,
    
    // Core functions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    
    // Getters
    getWishlistCount,
    getWishlistTotal,
    getWishlistByCategory,
    hasItems,
    getRecentlyAdded,
    getItemsByPriceRange,
    getItemsOnSale,
    getTotalSavings,
    getUniqueBrands,
    
    // Cart integration
    moveToCart,
    moveAllToCart,
    
    // Utility
    showNotification
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Optional: Custom hook for wishlist with additional features
export const useWishlistWithFilters = () => {
  const wishlist = useWishlist();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('addedAt');

  const getFilteredAndSortedItems = () => {
    let items = [...wishlist.wishlistItems];

    // Apply filter
    switch (filter) {
      case 'onSale':
        items = items.filter(item => item.originalPrice && item.originalPrice > item.price);
        break;
      case 'inStock':
        items = items.filter(item => item.inStock === true);
        break;
      case 'new':
        items = items.filter(item => item.isNew === true);
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'priceLow':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'addedAt':
      default:
        items.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
    }

    return items;
  };

  return {
    ...wishlist,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    filteredItems: getFilteredAndSortedItems()
  };
};

// Optional: WishlistItem component for consistent rendering
export const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  return (
    <div className="wishlist-item">
      <div className="item-image">
        <img src={item.image || item.images?.[0]} alt={item.name} />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-price">${item.price}</p>
        {item.originalPrice && (
          <p className="item-original-price">
            <span className="line-through">${item.originalPrice}</span>
            <span className="discount">Save ${item.originalPrice - item.price}</span>
          </p>
        )}
        {item.inStock ? (
          <p className="in-stock">In Stock</p>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
      <div className="item-actions">
        {onMoveToCart && (
          <button onClick={() => onMoveToCart(item.id)} className="move-to-cart">
            Move to Cart
          </button>
        )}
        {onRemove && (
          <button onClick={() => onRemove(item.id)} className="remove">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistProvider;