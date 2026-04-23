// pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import { createcategory } from '@/services/api';
import { getallcategories } from '@/services/api';

const AdminCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const res = await getallcategories();
    console.log(res.data);
    setCategories(res.data);
  }

  useEffect( () => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const payload = { name }; // match backend expectation
        const res = await createcategory(payload);

        console.log(res);
        await fetchCategories();

        // reset form
        setName('');
        setIsModalOpen(false);
        setSelectedCategory(null);

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
  };

  const columns = [
    { header: 'Category Name', accessor: 'name' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory(row);
              setName(row.name); // Populate name for editing
              setIsModalOpen(true);
            }}
            className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-4 h-4 text-amber-500" />
          </button>
          <button className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors">
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
      className="p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Categories
          </h1>
          <p className="text-sm sm:text-base mt-1 text-gray-600">
            Manage your product categories
          </p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedCategory(null);
            setName('');
          }}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
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
          setName('');
        }}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
        size="sm"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedCategory(null);
                setName('');
              }}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
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