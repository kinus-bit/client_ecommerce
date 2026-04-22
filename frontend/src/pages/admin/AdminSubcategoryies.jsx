// pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import { createsubcategory, getallsubcategories } from '@/services/api';
import { getallcategories } from '@/services/api';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const AdminSubcategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubCategories] = useState([]);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSubcategories = async () => {
    const res = await getallsubcategories();
    console.log("Backend response", res);
    setSubCategories(res);
  }


  useEffect( () => {
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
      const res = await getallcategories();
      console.log(res);
      setCategories(res.data);
    }
  
  useEffect( () => {
        fetchCategories();
  }, []);
  

  console.log("bebugging:", subcategories);

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const payload = { name, category }; // match backend expectation
        const res = await createsubcategory(payload);

        console.log(res);
        await fetchSubcategories();

        // reset form
        setName('');
        setIsModalOpen(false);

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
  };

  const columns = [
    { header: 'Subategory Name', accessor: 'name' },
    {
        header: 'Category Name', 
        accessor: 'category',
        render: (value) => value?.name || 'N/A'
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
            Subcategories
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your product subcategories
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Subcategory
        </button>
      </div>

      <AdminTable 
        columns={columns}
        data={subcategories}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {category
                        ? categories.find((c) => c._id === category)?.name
                        : "Select category"}
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        {categories.map((cat) => (
                            <DropdownMenuItem
                                key={cat._id}
                                onClick={() => setCategory(cat._id)}
                            >
                                {cat.name}
                            </DropdownMenuItem>
                        ))}               
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) =>setName(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter category name"
            />
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

export default AdminSubcategories;