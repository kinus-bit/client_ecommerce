// components/dashboard/ChangePasswordForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { changePassword } from '@/services/api';

const ChangePasswordForm = ({ onSave, passwordSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      setApiError('');
      
      try {
        // Prepare data for backend
        const passwordDataForApi = {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        };
        
        // Call the API
        const response = await changePassword(passwordDataForApi);

        console.log("Backend success response:",response)
        
        if (response.success) {
          // Success - reset form and close
          setShowForm(false);
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          setErrors({});
          
          // Notify parent component
          if (onSave) {
            onSave(true);
          }
        } else {
          // Handle API error
          setApiError(response.message || 'Failed to change password. Please try again.');
        }
      } catch (err) {
        console.error('Error changing password:', err);
        console.log("Backend error:",err.response?.data || err.errorMessage)
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setApiError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <AnimatePresence>
        {passwordSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mt-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Password changed successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
            <p className="text-sm text-gray-500 mt-1">
              Keep your account secure with a strong password
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!showForm ? (
          <div className="text-center py-8">
            <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Want to change your password? We'll help you create a strong one.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Change Password
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-5">
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{apiError}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                }  ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                placeholder="Enter your current password"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.currentPassword}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }  ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.newPassword}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg
                 hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Password Tips:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use at least 8 characters</li>
          <li>• Include numbers, symbols, and both uppercase and lowercase letters</li>
          <li>• Avoid using personal information like your name or birthdate</li>
          <li>• Don't reuse passwords from other accounts</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePasswordForm;