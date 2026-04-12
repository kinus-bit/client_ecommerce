// components/user/DashboardSidebar.jsx
import React from 'react';
import { 
  User, Package, Settings, Lock, ShoppingBag, 
  ShoppingCart, CreditCard, Camera, ChevronRight 
} from 'lucide-react';

const DashboardSidebar = ({ user, activeTab, setActiveTab, isEditing, onAvatarChange }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'products', label: 'Browse Products', icon: ShoppingBag },
    { id: 'cart', label: 'My Cart', icon: ShoppingCart, badge: user?.cartCount },
    { id: 'checkout', label: 'Checkout', icon: CreditCard },
    { id: 'profile', label: 'Profile Settings', icon: Settings },
    { id: 'password', label: 'Change Password', icon: Lock },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* User Info Summary */}
      <div className="p-6 border-b border-gray-200 text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer">
              <Camera className="w-4 h-4 text-gray-600" />
              <input type="file" className="hidden" accept="image/*" onChange={onAvatarChange} />
            </label>
          )}
        </div>
        <h2 className="mt-3 font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500 break-all">{user.email}</p>
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                activeTab === item.id
                  ? 'bg-amber-50 text-amber-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;