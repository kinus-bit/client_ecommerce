// components/product/SpecificationsTab.jsx
import React from 'react';

const SpecificationsTab = ({ product }) => {
  return (
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
  );
};

export default SpecificationsTab;