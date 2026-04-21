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

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '1,429', icon: ShoppingBag, color: 'blue' },
    { title: 'Total Users', value: '3,542', icon: Users, color: 'purple' },
    { title: 'Total Products', value: '847', icon: Package, color: 'orange' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$299.00', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '$159.00', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$499.00', status: 'Shipped', date: '2024-01-13' },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: '$89.00', status: 'Pending', date: '2024-01-12' },
    { id: '#ORD-005', customer: 'David Brown', amount: '$1,299.00', status: 'Delivered', date: '2024-01-11' },
  ];

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount' },
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
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 hidden"
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
            {[
              { name: 'iPhone 15 Pro', sales: 245, revenue: '$244,755' },
              { name: 'MacBook Pro', sales: 189, revenue: '$245,211' },
              { name: 'Wireless Headphones', sales: 423, revenue: '$84,177' },
              { name: 'Samsung Galaxy S24', sales: 156, revenue: '$140,244' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <p className="font-semibold text-gray-900">{product.revenue}</p>
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
          data={recentOrders}
          itemsPerPage={5}
        />
      </div>
      </div>

     
    </motion.div>
  );
};

export default AdminDashboard;