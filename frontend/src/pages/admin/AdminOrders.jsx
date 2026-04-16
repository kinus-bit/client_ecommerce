// pages/admin/AdminOrders.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    { id: '#ORD-001', customer: 'John Doe', amount: 299, status: 'Delivered', date: '2024-01-15', items: 2 },
    { id: '#ORD-002', customer: 'Jane Smith', amount: 159, status: 'Processing', date: '2024-01-14', items: 1 },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: 499, status: 'Shipped', date: '2024-01-13', items: 3 },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: 89, status: 'Pending', date: '2024-01-12', items: 1 },
    { id: '#ORD-005', customer: 'David Brown', amount: 1299, status: 'Delivered', date: '2024-01-11', items: 2 },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-orange-500" />;
      default: return null;
    }
  };

  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Items', accessor: 'items' },
    { header: 'Amount', accessor: 'amount', render: (value) => `$${value}` },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <span>{value}</span>
        </div>
      )
    },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedOrder(row);
            setIsModalOpen(true);
          }}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Eye className="w-4 h-4 text-blue-500" />
        </button>
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
          Orders
        </h1>
        <p className="mt-1 text-gray-600">
          Manage and track customer orders
        </p>
      </div>

      <AdminTable 
        columns={columns}
        data={orders}
        itemsPerPage={10}
      />

      {/* Order Details Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-medium text-gray-900">
                  {selectedOrder.customer}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium text-gray-900">
                  {selectedOrder.date}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium text-gray-900">
                  ${selectedOrder.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-medium text-gray-900">
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Order Items
              </h3>
              <div className="rounded-lg border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <div className="grid grid-cols-3 text-sm font-medium text-gray-600">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                  </div>
                </div>
                {[1, 2].map((item) => (
                  <div key={item} className="p-3 border-b last:border-0 border-gray-200">
                    <div className="grid grid-cols-3 text-sm text-gray-900">
                      <span>iPhone 15 Pro</span>
                      <span>1</span>
                      <span>$999</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Update Status
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                Print Invoice
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </motion.div>
  );
};

export default AdminOrders;