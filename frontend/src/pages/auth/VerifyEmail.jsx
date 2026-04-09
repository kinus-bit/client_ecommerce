// pages/VerifyEmail.jsx - Updated to work with your backend
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation ,useParams} from 'react-router-dom';
import { Mail, RefreshCw, AlertCircle, CheckCircle, ArrowRight, Inbox } from 'lucide-react';
import { resendVerificationEmail, verifyEmail } from '../../services/api';

const VerifyEmail = () => {
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL
  
  const email = location.state?.email || localStorage.getItem('pendingVerificationEmail') || '';

  // Auto-verify when token is present in URL
  useEffect(() => {
    const verifyEmailToken = async () => {
      if (token) {
        setVerifying(true);
        setVerificationError('');
        
        try {
          const response = await verifyEmail(token);
          console.log('Verification response:', response.data);
          
          // Clear pending email
          localStorage.removeItem('pendingVerificationEmail');
          
          // Navigate to success page
          navigate('/verifysuccess', { 
            state: { message: 'Email verified successfully!' }
          });
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationError(error.response?.data?.message || 'Invalid or expired verification link');
        } finally {
          setVerifying(false);
        }
      }
    };
    
    verifyEmailToken();
  }, [token, navigate]);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Check if user came from registration
  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleResendEmail = async () => {
    if (!email) return;
    
    setResending(true);
    setResendError('');
    
    try {
      const res = await resendVerificationEmail(email);
      console.log(res.data);
      setResendSuccess(true);
      setCountdown(60);
      
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (error) {
      setResendError(error.response?.data?.message);
    } finally {
      setResending(false);
    }
  };

  
  // Show loading while verifying(only when token is present)
  if (verifying && token) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center">
                    <Loader className="w-10 h-10 text-white animate-spin" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Show error if verification failed (only when token was present)
  if (verificationError && token) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="relative w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{verificationError}</p>
              <Link to="/login">
                <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Back to Login
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Main verify email page (shown after signup or when no token)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="h-1.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />
          
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verify your email address
              </h1>
              <p className="text-gray-600">
                We sent a verification link to
              </p>
              <p className="font-medium text-gray-900 mt-1 break-all">
                {email}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Inbox className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Check your inbox
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Click the verification link in the email to activate your account.
                  </p>
                  
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <span className="font-medium">Didn't receive the email?</span> Check your spam folder or 
                      click the button below to send a new link.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {resendSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">
                    Verification email resent successfully! Check your inbox.
                  </span>
                </motion.div>
              )}

              {resendError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-800">{resendError}</span>
                </div>
              )}

              <button
                onClick={handleResendEmail}
                disabled={resending || countdown > 0}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {resending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend available in {countdown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend verification email
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Link to="/login">
                <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  Back to login
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>Check spam folder</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VerifyEmail;