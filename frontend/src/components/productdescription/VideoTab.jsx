// components/product/VideoTab.jsx
import React from 'react';

const VideoTab = ({ product }) => {
  if (!product.video) return null;
  
  return (
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
  );
};

export default VideoTab;