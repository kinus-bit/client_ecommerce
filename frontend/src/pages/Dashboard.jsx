// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  DashboardSidebar,
  DashboardStats,
  OrdersList,
  ProfileForm,
  ChangePasswordForm,
  QuickActions
} from '../components/user';
import ProductCatalogtest from '../pages/ProductCatalogtest';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import { getMe, updateProfile, uploadProfilePicture, deleteProfilePicture } from '@/services/api';
import { getImageUrl } from '@/utils/imageUtils';
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user: authUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  // Get active tab from URL params or state
  const getActiveTabFromUrl = () => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'orders', 'profile', 'password', 'products', 'cart', 'checkout'].includes(tab)) {
      return tab;
    }
    return 'overview';
  };

  const [activeTab, setActiveTabState] = useState(getActiveTabFromUrl);

   // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getMe();
        console.log('API response:',response);
        
        if (response.success && response.user) {
          
          // Transform backend user data to match your frontend structure
          const userData = {
            firstName: response.user.firstName || '',
            lastName: response.user.lastName || '',
            email: response.user.email || '',
            phone: response.user.phoneNumber || '', // Note: backend uses phoneNumber
            address: response.user.address || '',
            city: response.user.city || '',
            country: response.user.country || '',
            zipCode: response.user.zipCode || '',
            joinDate: response.user.createdAt ? new Date(response.user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'January 15, 2024',
            avatar: getImageUrl(response.user.profilePicture)
          };
          
          setUser(userData);
          setFormData(userData);
          
          
          // Update auth context if needed
          // if (updateUser) {
          //   updateUser(response.user);
          // }
        }
      } catch (err) {
        console.error(err.response?.data|| err.message);

        setError('Failed to load user data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); //[updateUser]

  

  // Close sidebar on window resize (if screen becomes large)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when tab changes (on mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [activeTab]);

  // Update URL when tab changes
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };

  // Check for tab from navigation state (for backward compatibility)
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Sync URL params with state on refresh
  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab && urlTab !== activeTab) {
      setActiveTabState(urlTab);
    }
  }, [searchParams]);

  

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    address: '',
    city: '',
    country: '',
    joinDate: '',
    avatar: null
  });

  const [formData, setFormData] = useState({ ...user });
  const [profileErrors, setProfileErrors] = useState({});

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-11-25',
      total: 1898,
      status: 'Delivered',
      items: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 999 },
        { name: 'Wireless Headphones', quantity: 1, price: 199 }
      ],
      tracking: '1Z999AA10123456784'
    },
    {
      id: 'ORD-002',
      date: '2024-11-10',
      total: 89,
      status: 'Delivered',
      items: [
        { name: "Men's Leather Jacket", quantity: 1, price: 89 }
      ],
      tracking: '1Z999AA10123456785'
    },
    {
      id: 'ORD-003',
      date: '2024-12-01',
      total: 1299,
      status: 'Processing',
      items: [
        { name: 'MacBook Pro', quantity: 1, price: 1299 }
      ],
      tracking: null
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('profilePicture', file);

        try {
        console.log('Uploading file...');

        const response = await uploadProfilePicture(formData);

        console.log('Upload response:',response);
        
        if (response.success) {
          // Get the full URL from response
          
          const fullUrl = getImageUrl(response.data.url);

          console.log('Full avatar URL:', fullUrl);

          // Update local state with full URL
          setFormData(prev => ({ ...prev, avatar: fullUrl }));
          setUser(prev => ({ ...prev, avatar: fullUrl }));
          
          // Show success message
          setProfileSuccess(true);
          setTimeout(() => setProfileSuccess(false), 3000);
        }else {
        console.error('Upload failed:', response);
        setProfileErrors(prev => ({ ...prev, avatar: 'Failed to upload image' }));
      }
      } catch (err) {
        console.error('Error uploading avatar:', err);
        setProfileErrors(prev => ({ ...prev, avatar: 'Failed to upload image' }));
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (user.avatar) {
      // Extract filename from URL
      const filename = user.avatar.split('/').pop();
      
      try {
        const response = await deleteProfilePicture('profiles', filename);

        console.log('Delete response:', response);
        
        // Update local state
        setFormData(prev => ({ ...prev, avatar: null }));
        setUser(prev => ({ ...prev, avatar: null }));
        
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
      } catch (err) {
        console.error('Error removing avatar:', err);
        setProfileErrors(prev => ({ ...prev, avatar: 'Failed to remove image' }));
      }
    }
  };


  const validateProfile = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    // if (!formData.email) errors.email = 'Email is required';
    // else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (validateProfile()) {
      try {
        // Prepare data for backend (note field name differences)
        const profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone, // Map phone to phoneNumber
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zipCode: formData.zipCode,
          profilePicture: formData.avatar
        };
        
        const response = await updateProfile(profileData);

        console.log('Update profile response:', response);
        
        if (response.success) {
          setUser(formData);
          setIsEditing(false);
          setProfileSuccess(true);
          setTimeout(() => setProfileSuccess(false), 3000);
        }else {
        throw new Error(response.message || 'Failed to update profile');
      }
      } catch (err) {
        console.error('Error updating profile:', err);
        setProfileErrors(prev => ({ ...prev, submit: 'Failed to update profile. Please try again.' }));
      }
    }
  };

  const handleSavePassword = (success) => {
    if (success) {
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
  };

  const handleLogout = async() => {
    await logout();
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-red-700 underline"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 hidden">
            <DashboardStats 
              orders={orders}
              cartItems={cartItems}
              wishlistItems={wishlistItems}
              joinDate={user.joinDate}
            />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  View All
                </button>
              </div>
              <OrdersList orders={orders.slice(0, 3)} getStatusColor={getStatusColor} />
            </div>
            <QuickActions cartItemsCount={cartItems.length} />
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
              <p className="text-sm text-gray-500 mt-1">Track and manage your orders</p>
            </div>
            <OrdersList orders={orders} getStatusColor={getStatusColor} />
          </div>
        );
      case 'profile':
        return (
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            profileSuccess={profileSuccess}
            profileErrors={profileErrors}
            onInputChange={handleProfileChange}
            onEdit={() => setIsEditing(true)}
            onCancel={() => {
              setFormData(user);
              setIsEditing(false);
              setProfileErrors({});
            }}
            onSave={handleSaveProfile}
            onAvatarChange={handleAvatarChange}
            onAvatarRemove={handleRemoveAvatar}
          />
        );
      case 'password':
        return (
          <ChangePasswordForm
            onSave={handleSavePassword}
            passwordSuccess={passwordSuccess}
          />
        );
      case 'products':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Browse Products</h2>
              <p className="text-sm text-gray-500 mt-1">
                Discover amazing products and add them to your cart
              </p>
            </div>
            <div className="p-6">
              <ProductCatalogtest />
            </div>
          </div>
        );
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                <p className="text-gray-600 mt-1">
                  Manage your profile, orders, and preferences
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar - Always visible on large screens */}
          <div className="hidden lg:block lg:col-span-1">
            <DashboardSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isEditing={isEditing}
              onAvatarChange={handleAvatarChange}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Sidebar Content */}
              <div className="p-4">
                <DashboardSidebar
                  user={user}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isEditing={isEditing}
                  onAvatarChange={handleAvatarChange}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;