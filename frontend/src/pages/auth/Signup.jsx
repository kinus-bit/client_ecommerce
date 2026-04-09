import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle } from 'lucide-react';
import { register } from '@/services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({username:"", email:"", password:""})
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!formData.username.trim) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'name must be at least 3 characters';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/(?=.*[A-Z])/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter';
    else if (!/(?=.*[0-9])/.test(formData.password)) newErrors.password = 'Password must contain at least one number';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handling  change in input
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    
    setLoading(true);
      try{
         // Handle signup logic here
      const res = await register(formData);
      console.log(res.data);
        // Store the email for verification page
      localStorage.setItem('pendingVerificationEmail', formData.email);
      Navigate('/verifyemail/' ,  { 
        state: { 
          email: formData.email,
          message: 'Please check your email to verify your account'
        }
      });
      }
       catch (error) {
         console.log(error.response?.data || error.message);
      }finally{
        setLoading(false);
      }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    return Math.min(strength, 4);
  };

  const passwordStrength = getPasswordStrength();
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

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
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-2 rounded-full shadow-lg mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-base">ShopEase</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account 🚀</h1>
          <p className="text-gray-200 text-sm mt-1">Join us for an amazing shopping experience</p>
        </motion.div>

        {/* Signup Card - Glass Effect with smaller padding */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* name Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1.5">
                    username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="text"
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 bg-white/10 backdrop-blur-sm border ${
                        errors.username ? 'border-red-400' : 'border-white/20'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm text-white placeholder-white/50`}
                      placeholder="Choose a username"
                    />
                  </div>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-1"
                    >
                      {errors.username}
                    </motion.p>
                  )}
                </div>

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
                  <label className="block text-sm font-semibold text-white mb-1.5">
                    Password
                  </label>
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
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1.5"
                    >
                      <div className="flex gap-1 h-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all ${
                              i < passwordStrength ? strengthColor[passwordStrength - 1] : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-white/70">
                        Password strength: <span className={`font-medium ${
                          passwordStrength >= 3 ? 'text-green-400' : 'text-orange-400'
                        }`}>{strengthText[passwordStrength - 1]}</span>
                      </p>
                    </motion.div>
                  )}
                  
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

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-9 pr-9 py-2 bg-white/10 backdrop-blur-sm border ${
                        errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm text-white placeholder-white/50`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-3.5 h-3.5 text-amber-500 rounded border-white/30 bg-white/10 focus:ring-amber-400"
                  />
                  <label htmlFor="terms" className="text-xs text-white/80 cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-amber-300 hover:text-amber-200 transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-amber-300 hover:text-amber-200 transition-colors">Privacy Policy</a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 text-xs mt-1"
                  >
                    {errors.acceptTerms}
                  </motion.p>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center  disabled:opacity-50 disabled:cursor-not-allowed justify-center gap-2 text-sm"
                >
                  {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
                </motion.button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 mt-1 border-t border-white/20">
              <p className="text-sm text-white/80">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors">
                  Sign In
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