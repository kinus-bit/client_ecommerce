// pages/admin/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import { getallorders } from '@/services/api';

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItems , setOrderItems] = useState([]);
  
  const fetchOrders = async () => {
    const res = await getallorders();
    console.log(res.orders);
    setOrderItems(res.orders);
  }

  useEffect( () => {
    fetchOrders();
  }, []);

  console.log("order item testing", orderItems)

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />;
      case 'Shipped': return <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />;
      case 'Pending': return <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />;
      default: return null;
    }
  };

  const columns = [
    { header: 'Order ID', accessor: '_id' },
    { 
      header: 'Customer', 
      accessor: 'user',
      render: (value) => value?.name || 'N/A'
    },
    { header: 'Contact', accessor: 'contact' },
    { 
      header: 'Items', 
      accessor: 'items',
      render:(value) => value?.length
    },
    { header: 'Amount', accessor: 'totalAmount', render: (value) => `Ksh${value}` },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <div className="flex items-center gap-1 sm:gap-2">
          {getStatusIcon(value)}
          <span className="text-xs sm:text-sm">{value}</span>
        </div>
      )
    },
    { header: 'Date', accessor: 'createdAt' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedOrder(row);
            setIsModalOpen(true);
          }}
          className="p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
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
      className="p-4 sm:p-6"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Orders
        </h1>
        <p className="text-sm sm:text-base mt-1 text-gray-600">
          Manage and track customer orders
        </p>
      </div>

      <AdminTable 
        columns={columns}
        data={orderItems}
        itemsPerPage={10}
      />

      {/* Order Details Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Order Details - ${selectedOrder?._id || ''}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-4 sm:space-y-6">
            {/* Order Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Customer</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                  {selectedOrder.user?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Contact</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                  {selectedOrder.contact || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Order Date</p>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {selectedOrder.createdAt || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Amount</p>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  ${selectedOrder.totalAmount || '0'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Status</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {selectedOrder.status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                Order Items
              </h3>
              <div className="rounded-lg border border-gray-200 overflow-x-auto">
                {/* Desktop Header */}
                <div className="hidden sm:grid grid-cols-3 p-3 border-b border-gray-200 bg-gray-50">
                  <span className="text-xs font-medium text-gray-600 uppercase">Product</span>
                  <span className="text-xs font-medium text-gray-600 uppercase">Quantity</span>
                  <span className="text-xs font-medium text-gray-600 uppercase">Price</span>
                </div>
                
                {/* Items List */}
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-3 border-b last:border-0 border-gray-200">
                      {/* Desktop View */}
                      <div className="hidden sm:grid grid-cols-3 text-sm text-gray-900">
                        <span className="break-words">{item.product?.name || item.name || 'Product'}</span>
                        <span>{item.quantity || 1}</span>
                        <span>${item.price || 0}</span>
                      </div>
                      
                      {/* Mobile View */}
                      <div className="sm:hidden space-y-2">
                        <div>
                          <span className="text-xs font-medium text-gray-500">Product: </span>
                          <span className="text-sm text-gray-900 break-words">
                            {item.product?.name || item.name || 'Product'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <span className="text-xs font-medium text-gray-500">Quantity: </span>
                            <span className="text-sm text-gray-900">{item.quantity || 1}</span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">Price: </span>
                            <span className="text-sm text-gray-900">${item.price || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No items found for this order
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
              <button
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Update Status
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base">
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