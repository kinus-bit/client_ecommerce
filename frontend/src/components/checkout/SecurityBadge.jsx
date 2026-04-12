// components/checkout/SecurityBadge.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityBadge = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
      <Shield className="w-4 h-4" />
      <span>Your information is protected by 256-bit SSL encryption</span>
    </div>
  );
};

export default SecurityBadge;