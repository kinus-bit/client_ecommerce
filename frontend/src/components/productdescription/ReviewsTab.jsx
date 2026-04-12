// components/product/ReviewsTab.jsx
import React from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';

const ReviewsTab = ({ product }) => {
  return (
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
  );
};

export default ReviewsTab;