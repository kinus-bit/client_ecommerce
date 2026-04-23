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
import { getallorders, getAllProducts, getallusers } from '@/services/api';
import { useState } from 'react';
import { useEffect } from 'react';

const AdminDashboard = () => {


  const [orderItems , setOrderItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  
    const fetchOrders = async () => {
      const res = await getallorders();
      console.log(res.orders);
      // setOrders(res.items);
      setOrderItems(res.orders);
  }

    
  useEffect( () => {
    fetchOrders();
  }, []);

    const fetchUsers = async () => {
      const res = await getallusers();
      console.log(res.data);
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
    { title: 'Total Products', value:products.length, icon: Package, color: 'orange' },
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value]}`}>
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
      className="p-6 "
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <AdminStatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h3>
          <div className="space-y-4">
            {products.slice(0,5).map((product, _id) => (
              <div key={_id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                </div>
                <p className="font-semibold text-gray-900">${product.price}</p>
              </div>
            ))}
          </div>
        </div>

         {/* Recent Orders Table */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
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