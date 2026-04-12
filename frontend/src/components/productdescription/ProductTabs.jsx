// components/product/ProductTabs.jsx
import React from 'react';
import SpecificationsTab from './SpecificationsTab';
import ReviewsTab from './ReviewsTab';
import ShippingTab from './ShippingTab';
import VideoTab from './VideoTab';

const ProductTabs = ({ activeTab, setActiveTab, product, calculateDeliveryDate }) => {
  const tabs = [
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' },
    ...(product.video ? [{ id: 'video', label: 'Video' }] : [])
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'specifications':
        return <SpecificationsTab product={product} />;
      case 'reviews':
        return <ReviewsTab product={product} />;
      case 'shipping':
        return <ShippingTab product={product} calculateDeliveryDate={calculateDeliveryDate} />;
      case 'video':
        return <VideoTab product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 capitalize font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;