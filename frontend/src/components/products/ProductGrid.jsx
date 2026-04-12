// components/products/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import ProductList from './ProductList';
import { ProductGridSkeleton, ProductListSkeleton } from './ProductSkeleton';

const ProductGrid = ({ products, view = 'grid', loading = false, onAddToCart, onAddToWishlist, isInWishlist }) => {
  if (loading) {
    return view === 'grid' ? <ProductGridSkeleton /> : <ProductListSkeleton />;
  }

  if (view === 'list') {
    return (
      <ProductList 
        products={products} 
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        isInWishlist={isInWishlist}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          isInWishlist={isInWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;