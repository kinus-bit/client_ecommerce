// pages/admin/AdminDashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  Eye
} from 'lucide-react';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminTable from '../../components/admin/AdminTable';
import { getallorders, getAllProducts, getallusers, getMe } from '@/services/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUsername } from '@/utils/auth';

const AdminDashboard = () => {

  const [orderItems , setOrderItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState('');

  const fetchadmin = async () => {
    const res = await getMe();
    console.log("me:",res.user);
    setAdmin(res.user);
  }

  useEffect( () => { 
    fetchadmin();
  },[]);


  const fetchOrders = async () => {
    const res = await getallorders();
    console.log(res.orders);
    setOrderItems(res.orders);
  }

  useEffect( () => {
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    const res = await getallusers();
    console.log("user:",res.data);
    setUsers(res.data);
  }

  useEffect( () => { 
    fetchUsers();
  },[]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log('API Response:', response);
      
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
  }};

  useEffect( () => { 
    fetchProducts();
  },[]);

  console.log("testing product", products)

  const stats = [
    { title: 'Total Orders', value: orderItems.length, icon: ShoppingBag, color: 'blue' },
    { title: 'Total Users', value: users.length, icon: Users, color: 'purple' },
    { title: 'Total Products', value: products.length, icon: Package, color: 'orange' },
  ];

  console.log("all orders tesing", orderItems);

  const orderColumns = [
    { header: 'Order ID', accessor: '_id' },
    { 
      header: 'Customer',
      accessor: 'user',
      render: (value) => value?.name
    },
    { header: 'Amount', accessor: 'totalAmount' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => {
        const statusColors = {
          Delivered: 'bg-green-100 text-green-700',
          Processing: 'bg-blue-100 text-blue-700',
          Shipped: 'bg-purple-100 text-purple-700',
          Pending: 'bg-yellow-100 text-yellow-700',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-700'}`}>
            {value}
          </span>
        );
      }
    },
    { header: 'Date', accessor: 'createdAt' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-6"
    >
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-sm sm:text-base mt-1 text-gray-600">
          Welcome admin,<span className='font-bold'>{admin.name}</span> ! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Products Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {products.slice(0,5).map((product, index) => (
              <div key={index} className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                    {product.name}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  Ksh{product.price}
                </p>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No products available
              </p>
            )}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <AdminTable 
            columns={orderColumns}
            data={orderItems}
            itemsPerPage={5}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;