// pages/admin/AdminUsers.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Shield, UserX, UserCheck } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', orders: 12, joined: '2024-01-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', orders: 8, joined: '2024-01-05' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', orders: 3, joined: '2024-01-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Moderator', status: 'Active', orders: 15, joined: '2024-01-15' },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Admin' 
            ? 'bg-purple-100 text-purple-700'
            : value === 'Moderator'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
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
    { header: 'Orders', accessor: 'orders' },
    { header: 'Joined', accessor: 'joined' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Shield className="w-4 h-4 text-purple-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <Edit className="w-4 h-4 text-amber-500" />
          </button>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {row.status === 'Active' ? (
              <UserX className="w-4 h-4 text-red-500" />
            ) : (
              <UserCheck className="w-4 h-4 text-green-500" />
            )}
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Users
        </h1>
        <p className="mt-1 text-gray-600">
          Manage your customer base
        </p>
      </div>

      <AdminTable 
        columns={columns}
        data={users}
        itemsPerPage={10}
      />
    </motion.div>
  );
};

export default AdminUsers;