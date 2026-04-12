// components/dashboard/ProfileForm.jsx
import React, { useRef,useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, CheckCircle, Camera, X, Upload } from 'lucide-react';

const ProfileForm = ({ 
  formData, 
  isEditing, 
  profileSuccess, 
  profileErrors, 
  onInputChange, 
  onEdit,
  onCancel,
  onSave,
  onAvatarChange,
  onAvatarRemove
}) => {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveAvatar = () => {
    if (onAvatarRemove) {
      onAvatarRemove();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <AnimatePresence>
        {profileSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 mt-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
          <p className="text-sm text-gray-500 mt-1">Update your personal details</p>
        </div>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Avatar Container */}
            <div 
              className={`relative w-32 h-32 rounded-full overflow-hidden ${
                isEditing ? 'cursor-pointer group' : ''
              }`}
              onClick={handleAvatarClick}
            >
              {formData.avatar ? (
                <img 
                  src={formData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Overlay for editing */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            {/* Edit Button */}
            {isEditing && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  onClick={handleAvatarClick}
                  className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Change photo"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
                {formData.avatar && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              } ${profileErrors.firstName ? 'border-red-500' : ''}`}
            />
            {profileErrors.firstName && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              } ${profileErrors.lastName ? 'border-red-500' : ''}`}
            />
            {profileErrors.lastName && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.lastName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              } ${profileErrors.email ? 'border-red-500' : ''}`}
            />
            {profileErrors.email && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              } ${profileErrors.phone ? 'border-red-500' : ''}`}
            />
            {profileErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>

        {/* Upload hint when editing */}
        {isEditing && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Upload className="w-3 h-3" />
              Click on the profile picture to upload a new photo
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Recommended: Square image, at least 200x200 pixels
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;