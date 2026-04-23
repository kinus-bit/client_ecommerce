// components/admin/AdminTable.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminTable = ({ 
  columns, 
  data, 
  onRowClick,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log('current data',data);
  const currentData = data.slice(startIndex, endIndex);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile card view render
  const MobileCardView = () => (
    <div className="space-y-3 p-3 sm:p-4">
      {currentData.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: rowIndex * 0.05 }}
          onClick={() => onRowClick?.(row)}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="mb-3 last:mb-0">
              <div className="text-xs font-medium text-gray-500 mb-1">
                {column.header}
              </div>
              <div className="text-sm text-gray-900 break-words">
                {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
              </div>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.05 }}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden">
        <MobileCardView />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <span className="text-xs sm:text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Optional: Items per page info on mobile */}
          <div className="text-xs text-gray-500 order-1 sm:order-2">
            Showing {startIndex + 1} - {Math.min(endIndex, data.length)} of {data.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;