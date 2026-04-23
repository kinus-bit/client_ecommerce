// pages/admin/AdminSettings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Mail, Bell, ShoppingCart, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [settings, setSettings] = useState({
    // Email Settings
    adminEmail: 'admin@shopease.com',
    
    // Notification Settings
    newOrderEmail: true,
    newOrderPush: true,
    lowStockAlert: true,
    lowStockThreshold: 10,
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email', icon: Mail },
  ];

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const renderSettings = () => {
    switch(activeTab) {   
      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Order Notifications */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Order Alerts</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Email Notification</p>
                    <p className="text-xs sm:text-sm text-gray-500">Receive email when new order is placed</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.newOrderEmail}
                      onChange={(e) => handleChange('newOrderEmail', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Push Notification</p>
                    <p className="text-xs sm:text-sm text-gray-500">Real-time browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.newOrderPush}
                      onChange={(e) => handleChange('newOrderPush', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Stock Alerts */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Stock Alerts</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Low Stock Alert</p>
                    <p className="text-xs sm:text-sm text-gray-500">Get notified when products are low in stock</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.lowStockAlert}
                      onChange={(e) => handleChange('lowStockAlert', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
                
                {settings.lowStockAlert && (
                  <div className="pl-3 sm:pl-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      className="w-full sm:w-48 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                      value={settings.lowStockThreshold}
                      onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value))}
                      min="1"
                      max="50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this number</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'email':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                value={settings.adminEmail}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Where order notifications will be sent</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Email Configuration</p>
                  <p className="text-xs sm:text-sm text-blue-700 mt-1">
                    Email sending is configured on the backend. Contact your developer to set up SMTP settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-6"
    >
      {/* Removed 'hidden' class to make the page visible */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm sm:text-base mt-1 text-gray-600">Configure your notification preferences</p>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm sm:text-base">
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 w-full space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-50 text-amber-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label} Settings
            </h2>
          </div>

          {renderSettings()}

          <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;