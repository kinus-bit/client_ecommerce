// components/products/CategoryPills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const colorClasses = {
  cyan: 'bg-cyan-500 text-white shadow-md',
  rose: 'bg-rose-500 text-white shadow-md',
  amber: 'bg-amber-500 text-white shadow-md',
  emerald: 'bg-emerald-500 text-white shadow-md',
  yellow: 'bg-yellow-500 text-white shadow-md',
  violet: 'bg-violet-500 text-white shadow-md',
  pink: 'bg-pink-500 text-white shadow-md',
  teal: 'bg-teal-500 text-white shadow-md',
  orange: 'bg-orange-500 text-white shadow-md',
};

const CategoryPills = ({ categories, selectedCategory, onCategorySelect, onSubCategorySelect }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategorySelect('all')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selectedCategory === 'all'
            ? 'bg-gray-900 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All Products
      </motion.button>
      
      {Object.entries(categories).map(([key, category]) => {
        const hasSubCategories = category.subCategories.length > 0;
        
        if (hasSubCategories) {
          return (
            <DropdownMenu key={key}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedCategory === key
                      ? colorClasses[category.color]
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                  <ChevronDown className="w-3 h-3 ml-1 md:hidden lg:hidden" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={() => onCategorySelect(key)}
                  className="cursor-pointer"
                >
                  All {category.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {category.subCategories.map((subCategory) => (
                  <DropdownMenuItem
                    key={subCategory}
                    onClick={() => onSubCategorySelect(key, subCategory)}
                    className="cursor-pointer"
                  >
                    {subCategory}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        
        return (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 ${
              selectedCategory === key
                ? colorClasses[category.color]
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryPills;