// components/Layout.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {children}
    </div>
  );
};

export default Layout;