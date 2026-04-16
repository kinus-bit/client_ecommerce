// layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Set CSS variable for sidebar width
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isSidebarCollapsed ? '80px' : '280px'
    );
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 280px)' }}
      >
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;