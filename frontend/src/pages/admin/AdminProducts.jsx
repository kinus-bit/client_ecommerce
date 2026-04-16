// pages/admin/AdminProducts.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'iPhone 15 Pro', price: 999, stock: 15, status: 'Active', category: 'Electronics' },
    { id: 2, name: 'MacBook Pro', price: 1299, stock: 8, status: 'Active', category: 'Electronics' },
    { id: 3, name: "Men's Leather Jacket", price: 89, stock: 25, status: 'Active', category: 'Fashion' },
    { id: 4, name: 'Samsung Galaxy S24', price: 899, stock: 20, status: 'Active', category: 'Electronics' },
    { id: 5, name: 'Women\'s Summer Dress', price: 59, stock: 35, status: 'Inactive', category: 'Fashion' },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Product Name', accessor: 'name' },
    { header: 'Price', accessor: 'price', render: (value) => `$${value}` },
    { header: 'Stock', accessor: 'stock' },
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
    { header: 'Category', accessor: 'category' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedProduct(row);
              setIsModalOpen(true);
            }}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Edit className="w-4 h-4 text-amber-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Products
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Products Table */}
      <AdminTable 
        columns={columns}
        data={filteredProducts}
        itemsPerPage={10}
      />

      {/* Add/Edit Product Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue={selectedProduct?.name}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                defaultValue={selectedProduct?.price}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                defaultValue={selectedProduct?.stock}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue={selectedProduct?.category}
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Living</option>
              <option>Sports</option>
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
              {selectedProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </AdminModal>
    </motion.div>
  );
};

export default AdminProducts;