import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles,LogIn, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email:"",password:""})
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add this state for error message

  const Navigate = useNavigate();

  useEffect(() => {
    // Hide navigation bar
    const navbar = document.querySelector('nav, header, .navbar, .navigation');
    if (navbar) navbar.style.display = 'none';
    
    // Hide footer
    const footer = document.querySelector('footer, .footer');
    if (footer) footer.style.display = 'none';
    
    document.body.classList.add('hide-nav-footer');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      document.body.classList.remove('hide-nav-footer');
      document.body.style.overflow = ''; // Restore body scroll
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({}); // Reset to empty object, not empty string
    setErrorMessage(''); // Clear error message
    setRequiresVerification(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage('');
    setRequiresVerification(false);
    setErrors({});

    try {
      // Handle signup logic here
      const res = await login(formData);
      console.log('Backend response:',res);
      localStorage.setItem('token', res.token);
      Navigate('/dashboard');
    } catch (error) {
      console.log(error.response?.data || error.message);
      if (error.response?.data?.requiresVerification) {
        setRequiresVerification(true);
        setUnverifiedEmail(error.response.data.email);
        setErrorMessage('Please verify your email address before logging in.');
      } else {
        setErrorMessage(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&auto=format"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-2xl" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
        style={{ margin: '0 auto' }}
      >
        {/* Logo/Brand - Smaller */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-2 rounded-full shadow-lg mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-base">ShopEase</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back! 👋</h1>
          <p className="text-gray-200 text-sm mt-1">Sign in to continue shopping</p>
        </motion.div>

        {/* Login Card - Glass Effect with smaller padding */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-6">
            {/* Error message display - Fixed */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                    {requiresVerification && (
                      <Link 
                        to="/verifyemail" 
                        state={{ email: unverifiedEmail }}
                        className="text-sm text-gray-900 font-medium hover:underline mt-1 inline-block"
                      >
                        Resend verification email →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 bg-white/10 backdrop-blur-sm border ${
                        errors.email ? 'border-red-400' : 'border-white/20'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm text-white placeholder-white/50`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-white">
                      Password
                    </label>
                    <Link to="/forgotpassword"  
                      className="text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors">
                        Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-9 py-2 bg-white/10 backdrop-blur-sm border ${
                        errors.password ? 'border-red-400' : 'border-white/20'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm text-white placeholder-white/50`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 text-amber-500 rounded border-white/30 bg-white/10 focus:ring-amber-400"
                  />
                  <label htmlFor="remember" className="text-xs text-white/80 cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 mt-1 border-t border-white/20">
              <p className="text-sm text-white/80">
                Don't have an account?{' '}
                <Link to="/signup" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Badge - Smaller */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 grid grid-cols-3 gap-2 text-center"
        >
          <div className="text-xs text-white/70 flex items-center justify-center gap-1 backdrop-blur-sm bg-white/5 rounded-lg py-1.5 border border-white/10">
            <CheckCircle className="w-3 h-3 text-green-400" />
            Free Shipping
          </div>
          <div className="text-xs text-white/70 flex items-center justify-center gap-1 backdrop-blur-sm bg-white/5 rounded-lg py-1.5 border border-white/10">
            <CheckCircle className="w-3 h-3 text-green-400" />
            24/7 Support
          </div>
          <div className="text-xs text-white/70 flex items-center justify-center gap-1 backdrop-blur-sm bg-white/5 rounded-lg py-1.5 border border-white/10">
            <CheckCircle className="w-3 h-3 text-green-400" />
            Secure Payment
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}