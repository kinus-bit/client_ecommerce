// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  CreditCard,
  Shield,
  Truck,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();


  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/products' },
      // { name: 'Electronics', path: '/products?category=electronics' },
      // { name: 'Fashion', path: '/products?category=fashion' },
      // { name: 'Home & Living', path: '/products?category=home' },
      // { name: 'Sports', path: '/products?category=sports' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    // support: [
    //   { name: 'Help Center', path: '/help' },
    //   { name: 'Track Order', path: '/track-order' },
    //   { name: 'Returns', path: '/returns' },
    //   { name: 'Shipping Info', path: '/shipping' },
      // { name: 'FAQs', path: '/faqs' },
    // ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
  ];

  const paymentIcons = [
    { icon: CreditCard, name: 'MPESA' },
    { icon: CreditCard, name: 'PayPal' }
  ];

  const features = [
    { icon: Truck, text: 'Free shipping over $50' },
    { icon: Shield, text: 'Secure payments' },
    { icon: Heart, text: '30-day returns' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Features Bar */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white">ShopEase</span>
              <span className="block text-xs text-gray-400 mt-1">since 2026</span>
            </Link>
            
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Making online shopping easier, one order at a time. Real people, real products, real fast.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Karatina, Nyeri</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href="mailto:hello@shopease.com" className="hover:text-amber-400 transition-colors">
                  mungaiallan540@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href="tel: +254768332588" className="hover:text-amber-400 transition-colors">
                  +254 768332588
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------TO BE IMPLEMENTED LATER ------------------------------------*/}
          {/* <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
           {/* --------------------------------------------------------------------------------------------------------------- */}

        </div>
         
         {/* --------------------------------------------TO BE IMPLEMENTED LATER ------------------------------------*/}
        {/* Newsletter Signup */} 
        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-white mb-2">Join the club</h3>
              <p className="text-sm text-gray-400">
                Subscribe to get special offers, free giveaways, and behind-the-scenes access.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-white placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
        {/* --------------------------------------------------------------------------------------------------------------- */}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy;{currentYear} ShopEase. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">We accept:</span>
              <div className="flex gap-1">
                {paymentIcons.map((payment, index) => (
                  <div
                    key={index}
                    className="w-10 h-5 bg-gray-800 rounded flex items-center justify-center"
                    title={payment.name}
                  >
                     <payment.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-300">{payment.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-10 h-10 bg-amber-500 text-gray-900 rounded-full shadow-lg hover:bg-amber-400 transition-colors flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        ↑
      </motion.button>
    </footer>
  );
};

export default Footer;