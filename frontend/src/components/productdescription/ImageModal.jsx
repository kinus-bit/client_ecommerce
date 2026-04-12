// components/product/ImageModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ isOpen, images, selectedIndex, onClose, onIndexChange }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-amber-500"
            >
              Close
            </button>
            <img
              src={images[selectedIndex]}
              alt="Product"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onIndexChange(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex ? 'bg-amber-500 w-4' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;