// pages/admin/AdminProducts.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, X, AlertCircle } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import { 
  createProductWithImages, 
  getAllProducts, 
  deleteProduct,
  updateProduct,
  getallcategories,
  getallsubcategories
} from '@/services/api';

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isSubcategoryRequired, setIsSubcategoryRequired] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subCategory: '',
    color: '',
    stock: '',
    discount: '',
    specifications: '',
    highlights: '',
    comments: '',
    IsNew: false,
  });

  // Helper function to parse array values that might be double-stringified
  const parseArrayField = (value) => {
    if (!value) return [];
    
    // If it's already an array
    if (Array.isArray(value)) {
      return value;
    }
    
    // If it's a string
    if (typeof value === 'string') {
      try {
        // Try to parse JSON
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return [value];
      } catch (e) {
        // If it's a comma-separated string
        if (value.includes(',')) {
          return value.split(',').map(item => item.trim()).filter(item => item);
        }
        return [value];
      }
    }
    
    return [];
  };

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Filter subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const filtered = subcategories.filter(
        sub => sub.category && sub.category._id === formData.category
      );
      setFilteredSubcategories(filtered);
      
      // Check if the selected category has subcategories
      const hasSubcategories = filtered.length > 0;
      setIsSubcategoryRequired(hasSubcategories);
      
      // Reset subcategory when category changes
      setFormData(prev => ({ ...prev, subCategory: '' }));
    } else {
      setFilteredSubcategories([]);
      setIsSubcategoryRequired(false);
    }
  }, [formData.category, subcategories]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getallcategories();
      console.log('Categories fetched:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await getallsubcategories();
      console.log('Subcategories fetched:', response);
      setSubcategories(response);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError('Failed to fetch subcategories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProducts();
      console.log('API Response:', response);
      
      // Get products array from response
      let productsData = response.data?.data || response.data || [];
      
      // Clean up products data - parse any stringified arrays
      const cleanedProducts = productsData.map(product => ({
        ...product,
        color: product.color,
        specifications: product.specifications,
        highlights: product.highlights
      }));
      
      setProducts(cleanedProducts);
      console.log('Cleaned products:', cleanedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      header: 'Category', 
      accessor: 'category',
      render: (value) => value?.name || 'N/A'
    },
    { header: 'Product Name', accessor: 'name' },
    { 
      header: 'Price', 
      accessor: 'price', 
      render: (value) => `Ksh${value}` 
    },
    { header: 'Stock', accessor: 'stock' },
    { 
      header: 'Status', 
      accessor: 'stock',
      render: (value) => (
        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
          value > 0 
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {value > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
    { 
      header: 'Subcategory',
      accessor: 'subCategory',
      render:(value) => value?.name || 'N/A'
    },
    {
      header: 'Images',
      accessor: 'images',
      render: (value) => (
        <div className="flex gap-1">
          {value && value.slice(0, 2).map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt="product" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
            />
          ))}
          {value && value.length > 2 && (
            <span className="text-xs text-gray-500">+{value.length - 2}</span>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              setSelectedProduct(row);
              setIsModalOpen(true);
            }}
            className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
          </button>
          <button 
            onClick={() => handleEdit(row)}
            className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          </button>
          <button 
            onClick={() => handleDelete(row._id)}
            className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
          </button>
        </div>
      )
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Check file size (5MB limit)
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError('Some files exceed 5MB limit');
      return;
    }
    
    setImageFiles(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate subcategory only if the category has subcategories
    if (isSubcategoryRequired && !formData.subCategory) {
      setError('Please select a subcategory for this category');
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      
      // Add all text fields (trim values)
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('originalPrice', formData.originalPrice);
      formDataToSend.append('category', formData.category); // Send category ID
      
      // Only send subCategory if it has a value, otherwise send empty or null
      // Don't send it at all when empty
      if (formData.subCategory && formData.subCategory !== '') {
        formDataToSend.append('subCategory', formData.subCategory);
      }
      
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('discount', formData.discount || '0');
      formDataToSend.append('comments', formData.comments?.trim() || '');
      formDataToSend.append('IsNew', formData.IsNew);
      
      // Handle colors - split comma-separated string into array
      let colors = [];
      if (formData.color) {
        if (typeof formData.color === 'string') {
          colors = formData.color.split(',').map(c => c.trim()).filter(c => c);
        } else if (Array.isArray(formData.color)) {
          colors = formData.color;
        }
      }
      formDataToSend.append('color', JSON.stringify(colors));
      
      // Handle specifications
      let specifications = [];
      if (formData.specifications) {
        if (typeof formData.specifications === 'string') {
          specifications = formData.specifications.split(',').map(s => s.trim()).filter(s => s);
        } else if (Array.isArray(formData.specifications)) {
          specifications = formData.specifications;
        }
      }
      formDataToSend.append('specifications', JSON.stringify(specifications));
      
      // Handle highlights
      let highlights = [];
      if (formData.highlights) {
        if (typeof formData.highlights === 'string') {
          highlights = formData.highlights.split(',').map(h => h.trim()).filter(h => h);
        } else if (Array.isArray(formData.highlights)) {
          highlights = formData.highlights;
        }
      }
      formDataToSend.append('highlights', JSON.stringify(highlights));
      
      // Add images
      imageFiles.forEach(file => {
        formDataToSend.append('images', file);
      });
      
      let response;
      if (selectedProduct) {
        // Update existing product
        response = await updateProduct(selectedProduct._id, formDataToSend);
        setSuccessMessage('Product updated successfully');
      } else {
        // Create new product
        response = await createProductWithImages(formDataToSend);
        setSuccessMessage('Product created successfully');
        console.log(response);
      }
      
      // Reset form and refresh products
      resetForm();
      await fetchProducts();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Error:', error?.response?.data || error.message);
      
      // Extract error message from backend
      let errorMessage = 'Failed to save product';
      
      if (error?.response?.data) {
        const backendError = error.response.data;
        
        if (backendError.message) {
          errorMessage = backendError.message;
        }
        
        // Handle validation errors from mongoose
        if (backendError.error?.includes('validation failed')) {
          errorMessage = 'Please check all required fields and try again';
        }
        
        // Handle specific field errors
        if (backendError.errors) {
          const fieldErrors = Object.values(backendError.errors).map(err => err.message).join(', ');
          errorMessage = fieldErrors;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    
    // Convert arrays to comma-separated strings for form display
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category?._id || product.category || '',
      subCategory: product.subCategory?._id || product.subCategory || '',
      color: Array.isArray(product.color) ? product.color.join(', ') : product.color || '',
      stock: product.stock || '',
      discount: product.discount || '',
      specifications: Array.isArray(product.specifications) ? product.specifications.join(', ') : product.specifications || '',
      highlights: Array.isArray(product.highlights) ? product.highlights.join(', ') : product.highlights || '',
      comments: product.comments || '',
      IsNew: product.IsNew || false,
    });
    
    setImageFiles([]);
    setImagePreviews([]);
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setError(null);
        const response = await deleteProduct(id);
        console.log(response);
        setSuccessMessage('Product deleted successfully');
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error.response?.data);
        const errorMessage = error?.response?.data?.message || 'Failed to delete product';
        setError(errorMessage);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      subCategory: '',
      color: '',
      stock: '',
      discount: '',
      specifications: '',
      highlights: '',
      comments: '',
      IsNew: false,
    });
    setImageFiles([]);
    setImagePreviews([]);
    setSelectedProduct(null);
    setError(null);
    setIsSubcategoryRequired(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

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
            Products
          </h1>
          <p className="text-sm sm:text-base mt-1 text-gray-600">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm sm:text-base">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2 text-sm sm:text-base">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Products Table */}
      <AdminTable 
        columns={columns}
        data={filteredProducts}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Product Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Price + Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price * (Ksh)
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (Ksh)
              </label>
              <input
                type="number"
                step="0.01"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Stock + Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                step="0.01"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category Dropdown - Fetched from Backend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              disabled={loadingCategories}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </option>
              ))}
            </select>
            {loadingCategories && (
              <p className="text-xs text-gray-500 mt-1">Loading categories...</p>
            )}
          </div>

          {/* SubCategory Dropdown - Only show if category has subcategories */}
          {formData.category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Category {isSubcategoryRequired && '*'}
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required={isSubcategoryRequired}
                disabled={filteredSubcategories.length === 0}
                className={`w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base ${
                  filteredSubcategories.length === 0 ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="">{filteredSubcategories.length === 0 ? 'No subcategories available' : 'Select Sub Category (Optional)'}</option>
                {filteredSubcategories.map(sub => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {!isSubcategoryRequired && filteredSubcategories.length === 0 && (
                <p className="text-xs text-green-600 mt-1">✓ This category doesn't require a subcategory</p>
              )}
              {isSubcategoryRequired && (
                <p className="text-xs text-amber-600 mt-1">Please select a subcategory for this category</p>
              )}
            </div>
          )}

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors (comma separated) *
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Black, White, Red"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specifications (comma separated) *
            </label>
            <input
              type="text"
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              placeholder="4GB RAM, 64GB Storage, 6.5 inch Display"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highlights (comma separated) *
            </label>
            <input
              type="text"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Fast Charging, Water Resistant, 5G Ready"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 5 images, up to 5MB each. Supported formats: JPG, PNG, GIF
            </p>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Previews
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Is New */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="IsNew"
              checked={formData.IsNew}
              onChange={handleChange}
              className="w-4 h-4 rounded focus:ring-amber-500"
            />
            <label className="text-sm text-gray-700">Mark as New Product</label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
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