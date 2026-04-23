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
        setCategory('');
        setIsModalOpen(false);

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
  };

  const columns = [
    { header: 'Subcategory Name', accessor: 'name' },
    {
        header: 'Category Name', 
        accessor: 'category',
        render: (value) => value?.name || 'N/A'
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              setSelectedCategory(row);
              setCategory(row.category?._id || row.category);
              setName(row.name);
              setIsModalOpen(true);
            }}
            className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          </button>
          <button className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
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
            Subcategories
          </h1>
          <p className="text-sm sm:text-base mt-1 text-gray-600">
            Manage your product subcategories
          </p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedCategory(null);
            setName('');
            setCategory('');
          }}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
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

      {/* Add/Edit Subcategory Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
          setName('');
          setCategory('');
        }}
        title={selectedCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
        size="sm"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-sm sm:text-base">
                  {category
                    ? categories.find((c) => c._id === category)?.name
                    : "Select category"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat._id}
                    onClick={() => setCategory(cat._id)}
                    className="text-sm sm:text-base"
                  >
                    {cat.name}
                  </DropdownMenuItem>
                ))}               
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              placeholder="Enter subcategory name"
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
                setCategory('');
              }}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
            >
              {selectedCategory ? 'Update' : 'Add'} Subcategory
            </button>
          </div>
        </form>
      </AdminModal>
    </motion.div>
  );
};

export default AdminSubcategories;