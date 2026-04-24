// pages/admin/AdminNotifications.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle, 
  Package,
  Trash2,
  Check,
  Clock
} from 'lucide-react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-001 for $299.00 from John Doe',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-002 for $159.00 from Jane Smith',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'iPhone 15 Pro has only 3 units left',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      message: 'Order #ORD-003 has been shipped',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'stock',
      title: 'Out of Stock',
      message: 'MacBook Pro is out of stock',
      time: '3 hours ago',
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case 'stock':
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const getIconBg = (type) => {
    switch(type) {
      case 'order':
        return 'bg-blue-50';
      case 'stock':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 sm:p-6 hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm sm:text-base mt-1 text-gray-600">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Mark all as read</span>
              <span className="sm:hidden">Mark all</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={deleteAll}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm sm:text-base"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Delete all</span>
              <span className="sm:hidden">Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            filter === 'all'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            filter === 'unread'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            filter === 'read'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl border border-gray-200">
            <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm sm:text-base text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl border transition-all hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-amber-500' : 'border-gray-200'
              }`}
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${getIconBg(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm sm:text-base font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4 mt-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 sm:p-1 text-gray-400 hover:text-amber-500 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 sm:p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AdminNotifications;