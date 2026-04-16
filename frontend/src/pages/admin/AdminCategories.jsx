// pages/admin/AdminCategories.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Electronics', slug: 'electronics', products: 245, status: 'Active' },
    { id: 2, name: 'Fashion', slug: 'fashion', products: 189, status: 'Active' },
    { id: 3, name: 'Home & Living', slug: 'home-living', products: 156, status: 'Active' },
    { id: 4, name: 'Sports', slug: 'sports', products: 89, status: 'Inactive' },
    { id: 5, name: 'Books', slug: 'books', products: 67, status: 'Active' },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Products', accessor: 'products' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory(row);
              setIsModalOpen(true);
            }}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-4 h-4 text-amber-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Categories
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your product categories
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <AdminTable 
        columns={columns}
        data={categories}
        itemsPerPage={10}
      />

      {/* Add/Edit Category Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue={selectedCategory?.name}
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue={selectedCategory?.slug}
              placeholder="category-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the category name
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue={selectedCategory?.status || 'Active'}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              {selectedCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </AdminModal>
    </motion.div>
  );
};

export default AdminCategories;