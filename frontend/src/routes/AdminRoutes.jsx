// routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminSubcategories from '../pages/admin/AdminSubcategoryies';
import ProtectedRoute from '../utils/ProtectedRoute';
import AdminNotifications from '../pages/admin/AdminNotifications';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute adminOnly={true}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="subcategories" element={<AdminSubcategories/>}/>
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;