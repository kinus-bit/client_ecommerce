// components/products/ProductSkeleton.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Grid View Skeleton
export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image Skeleton */}
          <div className="relative h-64 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
            
            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
            
            {/* Price and Button Skeleton */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-8 bg-gray-200 rounded-xl animate-pulse w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// List View Skeleton
export const ProductListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Image Skeleton */}
            <div className="sm:w-48 h-48 bg-gray-200 animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="flex-1 p-4 space-y-3">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-48"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24 mt-2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
              
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              
              {/* Rating Skeleton */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
              
              {/* Buttons Skeleton */}
              <div className="flex gap-2 mt-2">
                <div className="h-9 bg-gray-200 rounded-lg animate-pulse flex-1"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Category Pills Skeleton
export const CategoryPillsSkeleton = ({ count = 8 }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="h-9 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
      ))}
    </div>
  );
};

// Filters Skeleton
export const FiltersSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-6"></div>
      <div className="space-y-3">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="h-8 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

// Search Bar Skeleton
export const SearchBarSkeleton = () => {
  return (
    <div className="relative">
      <div className="w-full md:w-80 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>
  );
};

// Main Product Catalog Skeleton
const ProductCatalogSkeleton = ({ view = 'grid' }) => {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
          <SearchBarSkeleton />
        </div>
      </div>

      {/* Controls Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <CategoryPillsSkeleton />
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Products Skeleton */}
      {view === 'grid' ? (
        <ProductGridSkeleton count={6} />
      ) : (
        <ProductListSkeleton count={4} />
      )}
    </div>
  );
};

export default ProductCatalogSkeleton;