// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '/components/Navbar';
import Footer from '/components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductCatalog from './pages/ProductCatalog';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import WishlistProvider from './context/WishlistContext';
import ScrollToTop from '/components/ScrollToTop';
import NextStagePage from './pages/NextStagePage';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <Router>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <ScrollToTop/>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/product/:id" element={<ProductDescription />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/nextstage" element={<NextStagePage/>}/>
              {/* <Route path="/checkout" element={<Checkout />} /> */}
            </Routes>
          </AnimatePresence>
          <Footer/>
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;