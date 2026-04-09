// pages/EmailVerificationSuccess.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear pending verification email
    localStorage.removeItem('pendingVerificationEmail');
    
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          
          <Link to="/login">
            <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Continue to login
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <p className="mt-4 text-xs text-gray-500">
            Redirecting to login in 5 seconds...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmailVerificationSuccess;